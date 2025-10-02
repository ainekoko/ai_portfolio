// src/components/three/ScrollController.tsx
'use client';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, useCallback } from 'react';

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

  // 手動スクロール検知用
  const userScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  /**
   * セクション位置を自動計算する関数
   * DOM要素の実際の位置を測定してvh値に変換
   */
  const calculateSectionPositions = useCallback((): void => {
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
        // セクションの要素を取得
        const element: HTMLElement | null = document.getElementById(sectionId);
        if (element) {
          // 要素の正確な位置を取得
          const rect: DOMRect = element.getBoundingClientRect();
          // ページ全体に対するトップ位置を計算
          const elementTop: number = rect.top + window.pageYOffset;

          // オフセットを調整（ヘッダーの高さなどを考慮）
          const offset: number = sectionId === 'topSection' ? 0 : -10; // 10pxのオフセット
          // 調整後のトップ位置
          const adjustedTop: number = elementTop + offset;

          // ピクセル値をvh値に変換
          const vh: number = window.innerHeight / 100;
          // vh位置を計算（負の値を0にクランプ）
          const vhPosition: number = Math.max(0, adjustedTop / vh);

          positions[sectionId] = vhPosition;
        } else {
          // フォールバック値を設定（ワーニングは削除）
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
      // 元のスクロール位置に戻す
      window.scrollTo(0, currentScroll);
    }, 100);
  }, []);

  /**
   * セクション位置を手動で再計算する関数
   */
  const recalculatePositions: RecalculatePositionsFunction =
    useCallback((): void => {
      calculateSectionPositions();
    }, [calculateSectionPositions]);

  /**
   * 指定されたセクションまでスムーズスクロールする関数
   */
  const scrollToSection: ScrollToSectionFunction = useCallback(
    (sectionId: string): void => {
      // scrollが未初期化の場合は待機
      if (!scroll?.el) {
        console.warn('Scroll element not ready, retrying...');
        setTimeout(() => scrollToSection(sectionId), 100);
        return;
      }

      // セクション位置が未計算の場合は計算してから実行
      if (Object.keys(sectionPositions.current).length === 0) {
        console.log('Section positions not calculated, calculating...');
        calculateSectionPositions();
        setTimeout(() => scrollToSection(sectionId), 500);
        return;
      }

      // ターゲットのvh位置を取得
      const targetVh: number | undefined = sectionPositions.current[sectionId];

      if (targetVh !== undefined) {
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

        // クライアントのビューポートの高さを取得
        const documentClientHeight: number = window.innerHeight;
        // 最大スクロール可能距離を計算
        const documentMaxScroll: number =
          documentScrollHeight - documentClientHeight;

        // スクロール位置の割合を計算
        const scrollPercentage: number =
          documentMaxScroll > 0
            ? targetBrowserScrollTop / documentMaxScroll
            : 0;

        // Three.jsのスクロールコンテナの最大スクロール可能距離を計算
        const threeMaxScroll: number =
          scroll.el.scrollHeight - scroll.el.clientHeight;
        // Three.jsのターゲットスクロール位置を計算
        const targetThreeScrollTop: number = scrollPercentage * threeMaxScroll;
        // 現在のThree.jsのスクロール位置を取得
        const currentThreeScrollTop: number = scroll.el.scrollTop;

        // スムーズスクロールアニメーション
        const duration: number = 1000;
        // アニメーションの開始時間を記録
        const startTime: number = Date.now();

        // アニメーションループ
        const animateScroll = (): void => {
          // 経過時間を計算
          const elapsed: number = Date.now() - startTime;

          // 進行度を0-1の範囲で計算
          const progress: number = Math.min(elapsed / duration, 1);

          // イージング関数（easeInOutQuart）
          const easeProgress: number =
            progress < 0.5
              ? 8 * progress * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 4) / 2;

          // 現在のスクロール位置を計算
          const currentBrowserPosition: number =
            currentBrowserScrollTop +
            (targetBrowserScrollTop - currentBrowserScrollTop) * easeProgress;

          // Three.jsの現在のスクロール位置を計算
          const currentThreePosition: number =
            currentThreeScrollTop +
            (targetThreeScrollTop - currentThreeScrollTop) * easeProgress;

          document.documentElement.scrollTop = currentBrowserPosition;
          document.body.scrollTop = currentBrowserPosition;

          if (scroll.el) {
            scroll.el.scrollTop = currentThreePosition;
          }

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
    },
    [scroll, calculateSectionPositions]
  );

  // グローバル関数を設定（useEffectで実行）
  useEffect(() => {
    if (!scroll?.el) return;

    console.log('Setting up global scroll functions');

    const extendedWindow = window as ExtendedWindow;
    extendedWindow.scrollToSection = scrollToSection;
    extendedWindow.recalculateSectionPositions = recalculatePositions;

    console.log('Global scroll functions set up successfully');

    // 初期化フラグを設定
    isInitialized.current = true;
  }, [scroll, scrollToSection, recalculatePositions]);

  // 初期化時とリサイズ時にセクション位置を再計算
  useEffect(() => {
    const recalculatePositionsHandler = (): void => {
      setTimeout(() => {
        calculateSectionPositions();
      }, 500);
    };

    // 初回計算（さらに遅延を追加）
    setTimeout(() => {
      recalculatePositionsHandler();
    }, 1000);

    // リサイズ時に再計算
    window.addEventListener('resize', recalculatePositionsHandler);

    // ページの読み込み完了後に再計算
    if (document.readyState === 'loading') {
      window.addEventListener('load', recalculatePositionsHandler);
    }

    return () => {
      window.removeEventListener('resize', recalculatePositionsHandler);
      window.removeEventListener('load', recalculatePositionsHandler);
    };
  }, [calculateSectionPositions]);

  // ブラウザスクロールからThree.jsへの同期（修正版）
  useEffect(() => {
    const handleBrowserScroll = (): void => {
      if (!scroll?.el || isAnimating.current) return;

      const currentBrowserScrollTop: number =
        window.pageYOffset || document.documentElement.scrollTop;

      // 手動スクロール検知
      userScrolling.current = true;
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        userScrolling.current = false;
      }, 100);

      if (
        Math.abs(currentBrowserScrollTop - lastBrowserScrollTop.current) > 1
      ) {
        syncDirection.current = 'browser-to-three';

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

        setTimeout(() => {
          syncDirection.current = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', handleBrowserScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleBrowserScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [scroll]);

  // Three.jsのスクロールとブラウザのスクロールを同期（Three.js → ブラウザ）修正版
  useFrame(() => {
    if (
      !scroll?.el ||
      isAnimating.current ||
      syncDirection.current === 'browser-to-three' ||
      userScrolling.current // ★ 手動スクロール中は同期をスキップ
    )
      return;

    const currentThreeScrollTop: number = scroll.el.scrollTop;

    if (Math.abs(currentThreeScrollTop - lastThreeScrollTop.current) > 1) {
      syncDirection.current = 'three-to-browser';

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

        // 手動スクロール中でなければ同期を実行
        if (!userScrolling.current) {
          document.documentElement.scrollTop = targetBrowserScrollTop;
          document.body.scrollTop = targetBrowserScrollTop;
        }

        lastThreeScrollTop.current = currentThreeScrollTop;
        lastBrowserScrollTop.current = targetBrowserScrollTop;
      }

      setTimeout(() => {
        syncDirection.current = null;
      }, 50);
    }
  });

  return null;
};

export default ScrollController;
