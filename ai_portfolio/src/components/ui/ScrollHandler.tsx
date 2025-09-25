'use client';
import { useEffect, useRef } from 'react';

interface ThreeScrollHandlerProps {
  scrollSpeed?: number; // スクロール速度の倍率 (デフォルト: 0.4)
  smoothness?: number; // 滑らかさ (デフォルト: 0.08)
  enableSmooth?: boolean; // 滑らかスクロールを有効にするか (デフォルト: true)
}

/**
 * Three.js環境専用のスクロールハンドラー
 * ブラウザのネイティブスクロールと協調動作する
 */
const ThreeScrollHandler = ({
  scrollSpeed = 0.4,
  smoothness = 0.08,
  enableSmooth = true,
}: ThreeScrollHandlerProps) => {
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const animationId = useRef<number | null>(null);
  const isScrolling = useRef(false);
  const userScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 初期スクロール位置を設定
    targetScrollY.current = window.pageYOffset;
    currentScrollY.current = window.pageYOffset;

    // 滑らかなスクロールのアニメーションループ
    const smoothScrollAnimation = () => {
      if (!enableSmooth) return;

      const difference = targetScrollY.current - currentScrollY.current;

      // 差が小さい場合は停止
      if (Math.abs(difference) < 0.1) {
        isScrolling.current = false;
        return;
      }

      // 滑らかに移動
      currentScrollY.current += difference * smoothness;

      // ユーザーが手動スクロール中でなければスクロール位置を適用
      if (!userScrolling.current) {
        window.scrollTo(0, currentScrollY.current);
      }

      // 次のフレームで継続
      animationId.current = requestAnimationFrame(smoothScrollAnimation);
    };

    // ホイールイベントハンドラー（Three.js環境用）
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // スクロール量を調整
      const scrollAmount = e.deltaY * scrollSpeed;

      if (!enableSmooth) {
        // 滑らかスクロールが無効の場合は直接スクロール
        window.scrollBy({
          top: scrollAmount,
          behavior: 'auto',
        });
        return;
      }

      // ターゲット位置を更新
      targetScrollY.current += scrollAmount;

      // スクロール範囲を制限
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.max(
        0,
        Math.min(targetScrollY.current, maxScroll)
      );

      // アニメーションを開始（まだ動いていない場合）
      if (!isScrolling.current) {
        isScrolling.current = true;
        smoothScrollAnimation();
      }
    };

    // ブラウザスクロールの検知（手動スクロール判定用）
    const handleBrowserScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 手動スクロールを検知
      if (Math.abs(currentScrollTop - currentScrollY.current) > 5) {
        userScrolling.current = true;
        targetScrollY.current = currentScrollTop;
        currentScrollY.current = currentScrollTop;

        // タイムアウトをリセット
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }

        // 200ms後に手動スクロール状態を解除
        scrollTimeout.current = setTimeout(() => {
          userScrolling.current = false;
        }, 200);
      }
    };

    // キーボードスクロール対応
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableSmooth) return;

      let scrollAmount = 0;

      switch (e.key) {
        case 'ArrowUp':
          scrollAmount = -50 * scrollSpeed;
          break;
        case 'ArrowDown':
          scrollAmount = 50 * scrollSpeed;
          break;
        case 'PageUp':
          scrollAmount = -window.innerHeight * 0.8 * scrollSpeed;
          break;
        case 'PageDown':
          scrollAmount = window.innerHeight * 0.8 * scrollSpeed;
          break;
        case 'Home':
          targetScrollY.current = 0;
          if (!isScrolling.current) {
            isScrolling.current = true;
            smoothScrollAnimation();
          }
          e.preventDefault();
          return;
        case 'End':
          targetScrollY.current =
            document.documentElement.scrollHeight - window.innerHeight;
          if (!isScrolling.current) {
            isScrolling.current = true;
            smoothScrollAnimation();
          }
          e.preventDefault();
          return;
        default:
          return;
      }

      if (scrollAmount !== 0) {
        e.preventDefault();
        targetScrollY.current += scrollAmount;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        targetScrollY.current = Math.max(
          0,
          Math.min(targetScrollY.current, maxScroll)
        );

        if (!isScrolling.current) {
          isScrolling.current = true;
          smoothScrollAnimation();
        }
      }
    };

    // リサイズ対応
    const handleResize = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScrollY.current = Math.min(targetScrollY.current, maxScroll);
      currentScrollY.current = Math.min(currentScrollY.current, maxScroll);
    };

    // イベントリスナーを追加
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleBrowserScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleBrowserScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);

      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [scrollSpeed, smoothness, enableSmooth]);

  return null;
};

export default ThreeScrollHandler;
