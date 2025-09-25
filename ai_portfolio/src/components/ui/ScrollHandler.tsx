// src/components/ui/SmoothScrollHandler.tsx
'use client';
import { useEffect, useRef } from 'react';

interface SmoothScrollHandlerProps {
  scrollSpeed?: number; // スクロール速度の倍率 (デフォルト: 0.3)
  smoothness?: number; // 滑らかさ (デフォルト: 0.08)
  enableSmooth?: boolean; // 滑らかスクロールを有効にするか (デフォルト: true)
}

const SmoothScrollHandler = ({
  scrollSpeed = 0.3,
  smoothness = 0.08,
  enableSmooth = true,
}: SmoothScrollHandlerProps) => {
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);
  const animationId = useRef<number | null>(null);
  const isScrolling = useRef(false);

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

      // スクロール位置を適用
      window.scrollTo(0, currentScrollY.current);

      // 次のフレームで継続
      animationId.current = requestAnimationFrame(smoothScrollAnimation);
    };

    // ホイールイベントハンドラー
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (!enableSmooth) {
        // 滑らかスクロールが無効の場合は直接スクロール
        const scrollAmount = e.deltaY * scrollSpeed;
        window.scrollBy({
          top: scrollAmount,
          behavior: 'auto',
        });
        return;
      }

      // ターゲット位置を更新
      const scrollAmount = e.deltaY * scrollSpeed;
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

    // タッチスクロール対応（モバイル）
    const handleTouchStart = (e: TouchEvent) => {
      if (!enableSmooth) return;

      const touch = e.touches[0];
      const startY = touch.clientY;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        moveEvent.preventDefault();
        const moveTouch = moveEvent.touches[0];
        const deltaY = (moveTouch.clientY - startY) * -2; // 感度調整

        targetScrollY.current += deltaY * scrollSpeed;
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
      };

      const handleTouchEnd = () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    };

    // キーボードスクロール対応
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!enableSmooth) return;

      let scrollAmount = 0;

      switch (e.key) {
        case 'ArrowUp':
          scrollAmount = -50;
          break;
        case 'ArrowDown':
          scrollAmount = 50;
          break;
        case 'PageUp':
          scrollAmount = -window.innerHeight * 0.8;
          break;
        case 'PageDown':
          scrollAmount = window.innerHeight * 0.8;
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

    // ブラウザの戻る/進むボタン対応
    const handlePopState = () => {
      targetScrollY.current = window.pageYOffset;
      currentScrollY.current = window.pageYOffset;
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
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleResize);

      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [scrollSpeed, smoothness, enableSmooth]);

  return null;
};

export default SmoothScrollHandler;
