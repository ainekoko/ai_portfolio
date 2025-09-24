'use client';
import React, { useEffect, useRef } from 'react';

class GentleSmoothScroll {
  private scrollContent: HTMLElement | null = null;
  private damping: number;
  private wheelSensitivity: number;
  private touchSensitivity: number;
  private currentY: number = 0;
  private targetY: number = 0;
  private totalHeight: number = 0;
  private touchStartY: number = 0;
  private isScrolling: boolean = false;

  constructor(
    options: {
      damping?: number;
      wheelSensitivity?: number;
      touchSensitivity?: number;
    } = {}
  ) {
    this.damping = options.damping || 0.15;
    this.wheelSensitivity = options.wheelSensitivity || 0.4;
    this.touchSensitivity = options.touchSensitivity || 0.6;
  }

  init(scrollContentRef: HTMLElement) {
    this.scrollContent = scrollContentRef;
    this.calculateTotalHeight();

    // ダミーボディの高さ設定
    document.body.style.height = `${this.totalHeight}px`;

    this.setupEventListeners();
    this.animate();
  }

  private calculateTotalHeight() {
    if (!this.scrollContent) return;

    const sections = this.scrollContent.querySelectorAll('[data-section]');
    this.totalHeight = Array.from(sections).reduce((total, section) => {
      return total + (section as HTMLElement).offsetHeight;
    }, 0);
  }

  private setupEventListeners() {
    // スクロールイベント
    window.addEventListener(
      'scroll',
      (e) => {
        if (this.isScrolling) return;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        this.targetY = -scrollTop;
      },
      { passive: true }
    );

    // ホイールイベント
    window.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();

        const delta = e.deltaY * this.wheelSensitivity;
        this.targetY -= delta;

        // 範囲制限
        const minY = -(this.totalHeight - window.innerHeight);
        const maxY = 0;
        this.targetY = Math.max(minY, Math.min(maxY, this.targetY));

        this.syncBrowserScroll();
      },
      { passive: false }
    );

    // タッチイベント
    window.addEventListener(
      'touchstart',
      (e) => {
        this.touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (this.touchStartY === undefined) return;

        e.preventDefault();

        const touchY = e.touches[0].clientY;
        const deltaY = (touchY - this.touchStartY) * this.touchSensitivity;

        this.targetY += deltaY;

        // 範囲制限
        const minY = -(this.totalHeight - window.innerHeight);
        const maxY = 0;
        this.targetY = Math.max(minY, Math.min(maxY, this.targetY));

        this.touchStartY = touchY;
        this.syncBrowserScroll();
      },
      { passive: false }
    );

    // リサイズイベント
    window.addEventListener('resize', () => {
      this.calculateTotalHeight();
      document.body.style.height = `${this.totalHeight}px`;
    });
  }

  private syncBrowserScroll() {
    this.isScrolling = true;
    window.scrollTo(0, -this.targetY);

    setTimeout(() => {
      this.isScrolling = false;
    }, 50);
  }

  private animate() {
    // 線形補間（バウンド効果なし）
    const diff = this.targetY - this.currentY;
    this.currentY += diff * this.damping;

    // 極小値での完全停止
    if (Math.abs(diff) < 0.1) {
      this.currentY = this.targetY;
    }

    // Transform適用
    if (this.scrollContent) {
      this.scrollContent.style.transform = `translate3d(0, ${this.currentY}px, 0)`;
    }

    requestAnimationFrame(() => this.animate());
  }

  scrollToSection(sectionId: string) {
    if (!this.scrollContent) return;

    const targetElement = this.scrollContent.querySelector(`#${sectionId}`);
    if (!targetElement) return;

    let targetOffset = 0;
    let currentElement = targetElement.previousElementSibling;

    while (currentElement) {
      if (currentElement.hasAttribute('data-section')) {
        targetOffset += (currentElement as HTMLElement).offsetHeight;
      }
      currentElement = currentElement.previousElementSibling;
    }

    this.scrollToPosition(-targetOffset);
  }

  private scrollToPosition(targetY: number, duration = 2500) {
    const startY = this.targetY;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // バウンド無しのイージング
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      this.targetY = startY + (targetY - startY) * easedProgress;

      // 範囲制限
      const minY = -(this.totalHeight - window.innerHeight);
      const maxY = 0;
      this.targetY = Math.max(minY, Math.min(maxY, this.targetY));

      this.syncBrowserScroll();

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  destroy() {
    document.body.style.height = '';
    // 実際の実装では全てのイベントリスナーを削除
  }
}

interface GentleScrollProviderProps {
  children: React.ReactNode;
  damping?: number;
  wheelSensitivity?: number;
  touchSensitivity?: number;
}

const GentleScrollProvider: React.FC<GentleScrollProviderProps> = ({
  children,
  damping = 0.15,
  wheelSensitivity = 0.4,
  touchSensitivity = 0.6,
}) => {
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const smoothScrollRef = useRef<GentleSmoothScroll | null>(null);

  useEffect(() => {
    if (!scrollContentRef.current) return;

    // GentleSmoothScroll初期化
    smoothScrollRef.current = new GentleSmoothScroll({
      damping,
      wheelSensitivity,
      touchSensitivity,
    });

    smoothScrollRef.current.init(scrollContentRef.current);

    // グローバル関数設定（ヘッダーからアクセス用）
    (window as any).scrollToSection = (sectionId: string) => {
      smoothScrollRef.current?.scrollToSection(sectionId);
    };

    return () => {
      smoothScrollRef.current?.destroy();
    };
  }, [damping, wheelSensitivity, touchSensitivity]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div
        ref={scrollContentRef}
        style={{
          position: 'relative',
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GentleScrollProvider;
