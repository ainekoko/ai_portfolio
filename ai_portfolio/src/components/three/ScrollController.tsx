// src/components/three/ScrollController.tsx
'use client';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

// グローバル関数の型定義
type ScrollToSectionFunction = (sectionId: string) => void;
type RecalculatePositionsFunction = () => void;

// Window型の拡張（型安全なアクセス用）
interface ExtendedWindow extends Window {
  scrollToSection?: ScrollToSectionFunction;
  recalculateSectionPositions?: RecalculatePositionsFunction;
}

/**
 * スクロール位置の同期とセクション位置の自動計算を行うコンポーネント
 *
 * 機能:
 * - ブラウザのスクロールとThree.jsのスクロールを双方向に同期
 * - DOM要素から各セクションの位置を自動計算
 * - グローバル関数でセクションへのスムーズスクロールを提供
 * - リサイズ時のセクション位置再計算
 *
 * @returns null (描画要素なし、ロジックのみ)
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
  const sectionPositions = useRef<Record<string, number>>({});

  /**
   * セクション位置を自動計算する関数
   * DOM要素の実際の位置を測定してvh値に変換
   */
  const calculateSectionPositions = (): void => {
    const positions: Record<string, number> = {};
    const sectionIds: string[] = [
      'topSection',
      'profile',
      'experience',
      'it',
      'skill',
      'contact',
    ];

    // 現在のスクロール位置を保存
    const currentScroll: number =
      window.pageYOffset || document.documentElement.scrollTop;

    // 一時的に最上部にスクロール（正確な位置を測定するため）
    window.scrollTo(0, 0);

    setTimeout(() => {
      sectionIds.forEach((sectionId: string) => {
        const element: HTMLElement | null = document.getElementById(sectionId);
        if (element) {
          // 要素の正確な位置を取得
          const rect: DOMRect = element.getBoundingClientRect();
          const elementTop: number = rect.top + window.pageYOffset;

          // オフセットを調整（ヘッダーの高さなどを考慮）
          const offset: number = sectionId === 'topSection' ? 0 : -80; // 80pxのオフセット
          const adjustedTop: number = elementTop + offset;

          // ピクセル値をvh値に変換
          const vh: number = window.innerHeight / 100;
          const vhPosition: number = Math.max(0, adjustedTop / vh);

          positions[sectionId] = vhPosition;
          console.log(
            `Section ${sectionId}: ${vhPosition.toFixed(
              1
            )}vh (${adjustedTop}px) - offset: ${offset}px`
          );
        } else {
          console.warn(`Element with id "${sectionId}" not found`);
          // フォールバック値を設定
          const fallbackPositions: Record<string, number> = {
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
    const recalculatePositions = (): void => {
      // DOM要素がレンダリングされるまで少し待つ
      setTimeout(() => {
        calculateSectionPositions();
      }, 300);
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

  // スクロール初期化フラグ管理
  useEffect(() => {
    if (!isInitialized.current && scroll) {
      isInitialized.current = true;
    }
  }, [scroll]);

  // ブラウザスクロールからThree.jsへの同期
  useEffect(() => {
    const handleBrowserScroll = (): void => {
      if (!scroll?.el || isAnimating.current) return;

      const currentBrowserScrollTop: number =
        window.pageYOffset || document.documentElement.scrollTop;

      // ブラウザのスクロールが変化した場合のみ同期
      if (
        Math.abs(currentBrowserScrollTop - lastBrowserScrollTop.current) > 1
      ) {
        syncDirection.current = 'browser-to-three';

        // ブラウザのスクロール位置をThree.jsに同期
        const documentScrollHeight: number = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight: number = window.innerHeight;
        const documentMaxScroll: number =
          documentScrollHeight - documentClientHeight;

        const scrollPercentage: number =
          documentMaxScroll > 0
            ? currentBrowserScrollTop / documentMaxScroll
            : 0;
        const threeMaxScroll: number =
          scroll.el.scrollHeight - scroll.el.clientHeight;
        const targetThreeScrollTop: number = scrollPercentage * threeMaxScroll;

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

  // グローバルなスクロール関数を設定
  useFrame(() => {
    if (!scroll || isInitialized.current) return;

    /**
     * 指定されたセクションまでスムーズスクロールする関数
     * @param sectionId - スクロール先のセクションID
     */
    const scrollToSection: ScrollToSectionFunction = (
      sectionId: string
    ): void => {
      // 最新のセクション位置を取得（必要に応じて再計算）
      if (Object.keys(sectionPositions.current).length === 0) {
        calculateSectionPositions();
        // 計算完了を待ってからスクロール
        setTimeout(() => {
          const extendedWindow = window as ExtendedWindow;
          extendedWindow.scrollToSection?.(sectionId);
        }, 500);
        return;
      }

      const targetVh: number | undefined = sectionPositions.current[sectionId];

      if (targetVh !== undefined) {
        console.log(`Scrolling to ${sectionId}: ${targetVh.toFixed(1)}vh`);

        isAnimating.current = true;
        syncDirection.current = 'three-to-browser';

        // 現在のスクロール位置を取得
        const currentBrowserScrollTop: number =
          window.pageYOffset || document.documentElement.scrollTop;

        // ターゲット位置を計算（vh -> px変換）
        const vh: number = window.innerHeight / 100;
        const targetBrowserScrollTop: number = targetVh * vh;

        // Three.jsのスクロール同期計算
        const documentScrollHeight: number = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight: number = window.innerHeight;
        const documentMaxScroll: number =
          documentScrollHeight - documentClientHeight;

        // より正確な同期のため、実際のピクセル位置から計算
        const scrollPercentage: number =
          documentMaxScroll > 0
            ? targetBrowserScrollTop / documentMaxScroll
            : 0;

        // Three.jsのターゲット位置
        const threeMaxScroll: number = scroll.el
          ? scroll.el.scrollHeight - scroll.el.clientHeight
          : 1;
        const targetThreeScrollTop: number = scrollPercentage * threeMaxScroll;
        const currentThreeScrollTop: number = scroll.el
          ? scroll.el.scrollTop
          : 0;

        console.log(
          `Target: ${targetBrowserScrollTop}px (${scrollPercentage * 100}%)`
        );

        // スムーズスクロールアニメーション
        const duration: number = 1000; // 1秒
        const startTime: number = Date.now();

        const animateScroll = (): void => {
          const elapsed: number = Date.now() - startTime;
          const progress: number = Math.min(elapsed / duration, 1);

          // イージング関数（easeInOutQuart）- より滑らか
          const easeProgress: number =
            progress < 0.5
              ? 8 * progress * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 4) / 2;

          // ブラウザのスクロール位置
          const currentBrowserPosition: number =
            currentBrowserScrollTop +
            (targetBrowserScrollTop - currentBrowserScrollTop) * easeProgress;

          // Three.jsのスクロール位置
          const currentThreePosition: number =
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

    /**
     * セクション位置を手動で再計算する関数
     */
    const recalculatePositions: RecalculatePositionsFunction = (): void => {
      calculateSectionPositions();
    };

    // 型安全にグローバル関数を設定
    const extendedWindow = window as ExtendedWindow;
    extendedWindow.scrollToSection = scrollToSection;
    extendedWindow.recalculateSectionPositions = recalculatePositions;

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

    const currentThreeScrollTop: number = scroll.el.scrollTop;

    // Three.jsのスクロール位置が変化した場合のみ同期
    if (Math.abs(currentThreeScrollTop - lastThreeScrollTop.current) > 1) {
      syncDirection.current = 'three-to-browser';

      // Three.jsのスクロール位置からブラウザのスクロール位置を計算
      const threeMaxScroll: number =
        scroll.el.scrollHeight - scroll.el.clientHeight;
      const scrollPercentage: number =
        threeMaxScroll > 0 ? currentThreeScrollTop / threeMaxScroll : 0;

      if (isFinite(scrollPercentage)) {
        const documentScrollHeight: number = Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight
        );
        const documentClientHeight: number = window.innerHeight;
        const documentMaxScroll: number =
          documentScrollHeight - documentClientHeight;

        const targetBrowserScrollTop: number =
          scrollPercentage * documentMaxScroll;

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
