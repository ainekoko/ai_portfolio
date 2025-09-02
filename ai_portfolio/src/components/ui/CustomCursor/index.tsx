// src/components/ui/CustomCursor/index.tsx
'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface CustomCursorProps {
  className?: string;
  hoverSelectors?: string;
  mainCursorSize?: number;
  followerCursorSize?: number;
  smoothness?: number; // 追従の滑らかさ (0-1)
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  className = '',
  hoverSelectors = 'a, button, [role="button"], input[type="button"], input[type="submit"], .nav-text, .clickable',
  mainCursorSize = 12,
  followerCursorSize = 32,
  smoothness = 0.15, // デフォルト値を追加
}) => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const animationFrameId = useRef<number | null>(null);
  const targetPos = useRef<CursorPosition>({ x: 0, y: 0 });

  // RequestAnimationFrameを使った滑らかなアニメーション
  const animate = useCallback(() => {
    setFollowerPos((prev) => {
      const deltaX = targetPos.current.x - prev.x;
      const deltaY = targetPos.current.y - prev.y;

      return {
        x: prev.x + deltaX * smoothness,
        y: prev.y + deltaY * smoothness,
      };
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, [smoothness]);

  // スロットリングされたマウスムーブハンドラー
  const throttledMouseMove = (() => {
    let isThrottled = false;

    return (e: MouseEvent) => {
      if (isThrottled) return;

      isThrottled = true;
      requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        targetPos.current = { x: e.clientX, y: e.clientY };
        isThrottled = false;
      });
    };
  })();

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverElement = target.matches(hoverSelectors);
      console.log('1', target, hoverSelectors);
      console.log('1', isHoverElement);
      setIsHovering(isHoverElement);
    },
    [hoverSelectors]
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // アニメーションループを開始
    animationFrameId.current = requestAnimationFrame(animate);

    // イベントリスナーを追加（passiveオプションでパフォーマンス向上）
    document.addEventListener('mousemove', throttledMouseMove, {
      passive: true,
    });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, {
      passive: true,
    });
    document.addEventListener('mouseenter', handleMouseEnter, {
      passive: true,
    });

    return () => {
      // クリーンアップ
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      document.removeEventListener('mousemove', throttledMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [
    animate,
    throttledMouseMove,
    handleMouseOver,
    handleMouseOut,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseEnter,
  ]);

  if (!isVisible) return null;

  return (
    <div className={className}>
      {/* メインカーソル */}
      <div
        className='fixed pointer-events-none z-[10001] will-change-transform'
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div
          className={`rounded-full transition-colors duration-300 ${
            isHovering
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
              : 'bg-gradient-to-r from-gray-800 to-black'
          }`}
          style={{
            width: mainCursorSize,
            height: mainCursorSize,
          }}
        />
      </div>

      {/* フォロワーカーソル（滑らかな追従） */}
      <div
        className='fixed pointer-events-none z-[10000] will-change-transform'
        style={{
          left: followerPos.x,
          top: followerPos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div
          className={`rounded-full border-2 transition-colors duration-300 ${
            isHovering
              ? 'border-purple-400 bg-purple-100/20 backdrop-blur-sm'
              : 'border-gray-400 bg-white/10 backdrop-blur-sm'
          }`}
          style={{
            width: followerCursorSize,
            height: followerCursorSize,
          }}
        />
      </div>

      {/* ホバー時の装飾エフェクト */}
      {isHovering && (
        <div
          className='fixed pointer-events-none z-[9999] will-change-transform'
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className='w-16 h-16 rounded-full border border-pink-300/30 animate-ping' />
        </div>
      )}

      {/* デフォルトカーソルを非表示 */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Three.jsのCanvasでもカーソルを非表示 */
        canvas {
          cursor: none !important;
        }
      `}</style>
    </div>
  );
};

export default CustomCursor;
