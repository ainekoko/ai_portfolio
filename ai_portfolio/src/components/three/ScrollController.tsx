// src/components/three/ScrollController.tsx
'use client';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

/**
 *
 * @returns ScrollControllerコンポーネント
 */
const ScrollController = () => {
  const scroll = useScroll();
  const isInitialized = useRef(false);
  const lastBrowserScrollTop = useRef(0);
  const lastThreeScrollTop = useRef(0);
  const isAnimating = useRef(false);
  const syncDirection = useRef<'browser-to-three' | 'three-to-browser' | null>(
    null
  );
  const sectionPositions = useRef<{ [key: string]: number }>({});

  // セクション位置を自動計算する関数（改良版）
  const calculateSectionPositions = () => {
    const positions: { [key: string]: number } = {};
    const sectionIds = [
      'topSection',
      'profile',
      'experience',
      'it',
      'skill',
      'contact',
    ];

    // 現在のスクロール位置を保存
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    // 一時的に最上部にスクロール（正確な位置を測定するため）
    window.scrollTo(0, 0);

    setTimeout(() => {
      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          // 要素の正確な位置を取得
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;

          // 少しオフセットを調整（ヘッダーの高さなどを考慮）
          const offset = sectionId === 'topSection'; // 80pxのオフセット
          const adjustedTop = elementTop + offset;

          // ピクセル値をvh値に変換
          const vh = window.innerHeight / 100;
          const vhPosition = Math.max(0, adjustedTop / vh);

          positions[sectionId] = vhPosition;
          console.log(
            `Section ${sectionId}: ${vhPosition.toFixed(
              1
            )}vh (${adjustedTop}px) - offset: ${offset}px`
          );
        } else {
          console.warn(`Element with id "${sectionId}" not found`);
          // フォールバック値を設定
          const fallbackPositions: { [key: string]: number } = {
            topSection: 0,
            profile: 300,
            experience: 340,
            it: 334,
            skill: 360,
            contact: 380,
          };
          positions[sectionId] = fallbackPositions[sectionId] || 0;
        }
      });

      sectionPositions.current = positions;
      console.log('Calculated section positions:', positions);

      // 元のスクロール位置に戻す
      window.scrollTo(0, currentScroll);
    }, 100);
  };

  // 初期化時とリサイズ時にセクション位置を再計算
  useEffect(() => {
    const recalculatePositions = () => {
      // DOM要素がレンダリングされるまで少し待つ
      setTimeout(() => {
        calculateSectionPositions();
      }, 300); // 少し長めに待つ
    };

    // 初回計算
    recalculatePositions();

    // リサイズ時に再計算
    window.addEventListener('resize', recalculatePositions);

    // ページの読み込み完了後に再計算
    if (document.readyState === 'loading') {
      window.addEventListener('load', recalculatePositions);
    }

    return () => {
      window.removeEventListener('resize', recalculatePositions);
      window.removeEventListener('load', recalculatePositions);
    };
  }, []);

  // スクロールデータを親に渡す（初回のみ）
  useEffect(() => {
    if (!isInitialized.current && scroll) {
      isInitialized.current = true;
    }
  }, [scroll]);

  // ブラウザスクロールからThree.jsへの同期
  useEffect(() => {
    const handleBrowserScroll = () => {
      if (!scroll?.el || isAnimating.current) return;

      const currentBrowserScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // ブラウザのスクロールが変化した場合のみ同期
      if (
        Math.abs(currentBrowserScrollTop - lastBrowserScrollTop.current) > 1
      ) {
        syncDirection.current = 'browser-to-three';

        // ブラウザのスクロール位置をThree.jsに同期
        const documentScrollHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight = window.innerHeight;
        const documentMaxScroll = documentScrollHeight - documentClientHeight;

        const scrollPercentage =
          documentMaxScroll > 0
            ? currentBrowserScrollTop / documentMaxScroll
            : 0;
        const threeMaxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
        const targetThreeScrollTop = scrollPercentage * threeMaxScroll;

        scroll.el.scrollTop = targetThreeScrollTop;
        lastBrowserScrollTop.current = currentBrowserScrollTop;
        lastThreeScrollTop.current = targetThreeScrollTop;

        // 同期方向をリセット
        setTimeout(() => {
          syncDirection.current = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', handleBrowserScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleBrowserScroll);
    };
  }, [scroll]);

  // グローバルなスクロール関数を設定（改良版）
  useFrame(() => {
    if (!scroll || isInitialized.current) return;

    // グローバル関数を設定
    (window as any).scrollToSection = (sectionId: string) => {
      // 最新のセクション位置を取得（必要に応じて再計算）
      if (Object.keys(sectionPositions.current).length === 0) {
        calculateSectionPositions();
        // 計算完了を待ってからスクロール
        setTimeout(() => {
          (window as any).scrollToSection(sectionId);
        }, 500);
        return;
      }

      const targetVh = sectionPositions.current[sectionId];

      if (targetVh !== undefined) {
        console.log(`Scrolling to ${sectionId}: ${targetVh.toFixed(1)}vh`);

        isAnimating.current = true;
        syncDirection.current = 'three-to-browser';

        // 現在のスクロール位置を取得
        const currentBrowserScrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        // ターゲット位置を計算（vh -> px変換）
        const vh = window.innerHeight / 100;
        const targetBrowserScrollTop = targetVh * vh;

        // Three.jsのスクロール同期計算
        const documentScrollHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight = window.innerHeight;
        const documentMaxScroll = documentScrollHeight - documentClientHeight;

        // より正確な同期のため、実際のピクセル位置から計算
        const scrollPercentage =
          documentMaxScroll > 0
            ? targetBrowserScrollTop / documentMaxScroll
            : 0;

        // Three.jsのターゲット位置
        const threeMaxScroll = scroll.el
          ? scroll.el.scrollHeight - scroll.el.clientHeight
          : 1;
        const targetThreeScrollTop = scrollPercentage * threeMaxScroll;
        const currentThreeScrollTop = scroll.el ? scroll.el.scrollTop : 0;

        console.log(
          `Target: ${targetBrowserScrollTop}px (${scrollPercentage * 100}%)`
        );

        // スムーズスクロールアニメーション
        const duration = 1000; // 1秒
        const startTime = Date.now();

        const animateScroll = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // イージング関数（easeInOutQuart）- より滑らか
          const easeProgress =
            progress < 0.5
              ? 8 * progress * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 4) / 2;

          // ブラウザのスクロール位置
          const currentBrowserPosition =
            currentBrowserScrollTop +
            (targetBrowserScrollTop - currentBrowserScrollTop) * easeProgress;

          // Three.jsのスクロール位置
          const currentThreePosition =
            currentThreeScrollTop +
            (targetThreeScrollTop - currentThreeScrollTop) * easeProgress;

          // 両方を同時に更新
          document.documentElement.scrollTop = currentBrowserPosition;
          document.body.scrollTop = currentBrowserPosition; // Safari対応

          if (scroll.el) {
            scroll.el.scrollTop = currentThreePosition;
          }

          // 最後の位置を記録
          lastBrowserScrollTop.current = currentBrowserPosition;
          lastThreeScrollTop.current = currentThreePosition;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            isAnimating.current = false;
            syncDirection.current = null;
            console.log(`Scroll completed to ${sectionId}`);
          }
        };

        animateScroll();
      } else {
        console.warn(
          `Section "${sectionId}" not found in calculated positions`
        );
      }
    };

    // セクション位置を手動で再計算する関数も提供
    (window as any).recalculateSectionPositions = () => {
      calculateSectionPositions();
    };

    isInitialized.current = true;
  });

  // Three.jsのスクロールとブラウザのスクロールを同期（Three.js → ブラウザ）
  useFrame(() => {
    if (
      !scroll?.el ||
      isAnimating.current ||
      syncDirection.current === 'browser-to-three'
    )
      return;

    const currentThreeScrollTop = scroll.el.scrollTop;

    // Three.jsのスクロール位置が変化した場合のみ同期
    if (Math.abs(currentThreeScrollTop - lastThreeScrollTop.current) > 1) {
      syncDirection.current = 'three-to-browser';

      // Three.jsのスクロール位置からブラウザのスクロール位置を計算
      const threeMaxScroll = scroll.el.scrollHeight - scroll.el.clientHeight;
      const scrollPercentage =
        threeMaxScroll > 0 ? currentThreeScrollTop / threeMaxScroll : 0;

      if (isFinite(scrollPercentage)) {
        const documentScrollHeight = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight = window.innerHeight;
        const documentMaxScroll = documentScrollHeight - documentClientHeight;

        const targetBrowserScrollTop = scrollPercentage * documentMaxScroll;

        // ブラウザのスクロール位置を同期
        document.documentElement.scrollTop = targetBrowserScrollTop;
        document.body.scrollTop = targetBrowserScrollTop; // Safari対応

        lastThreeScrollTop.current = currentThreeScrollTop;
        lastBrowserScrollTop.current = targetBrowserScrollTop;
      }

      // 同期方向をリセット
      setTimeout(() => {
        syncDirection.current = null;
      }, 50);
    }
  });

  return null;
};

export default ScrollController;
