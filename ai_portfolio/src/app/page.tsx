'use client';
import React, { useState, useEffect, useCallback } from 'react';
import ProfileSection from '@/components/sections/profileSection/ProfileSection';
import TopSection from '@/components/sections/topSection/TopSection';
import ExperienceSection from '@/components/sections/experienceSection/ExperienceSection';
import SkillSection from '@/components/sections/skillSection/SkillSection';
import ContactSection from '@/components/sections/contactSection/ContactSection';
import MessageSection from '@/components/sections/messageSection/MessageSection';
import Loading from '@/components/common/loading/Loading';

const ThreeCanvas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );

  const isVisible = (sectionId: string) => visibleSections.has(sectionId);

  // スクロールイベントハンドラー
  const handleScroll = useCallback(() => {
    const sectionIds = [
      'topSection',
      'hello',
      'profile',
      'message',
      'experience',
      'skill',
      'contact',
    ];

    const newVisibleSections = new Set<string>();

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);

      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      const isElementVisible = elementTop < windowHeight && elementBottom > 0;
      const visibleHeight =
        Math.min(elementBottom, windowHeight) - Math.max(elementTop, 0);
      const elementHeight = rect.height;
      const visibilityRatio = Math.max(0, visibleHeight) / elementHeight;

      // 要素の30%以上が表示されている場合に表示とみなす
      if (isElementVisible && visibilityRatio > 0.3) {
        newVisibleSections.add(sectionId);
      }
    });

    setVisibleSections(newVisibleSections);
  }, []);

  useEffect(() => {
    // 初回実行
    handleScroll();

    // 1.6秒後にフェードアウト開始
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1600);

    // フェードアウト完了後にローディングを非表示
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2100);

    // スクロールイベントリスナー
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    // リサイズイベントも追加
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // visibleSectionsが変更されたらログ出力
  useEffect(() => {}, [visibleSections]);

  return (
    <>
      {isLoading && (
        <div
          className={`${
            fadeOut ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-500`}
        >
          <Loading />
        </div>
      )}
      <TopSection isVisible={isVisible('hello')} />
      <ProfileSection isVisible={isVisible} />
      <MessageSection />
      <ExperienceSection isVisible={isVisible} />
      <SkillSection isVisible={isVisible} />
      <ContactSection isVisible={isVisible} />
    </>
  );
};

export default ThreeCanvas;
