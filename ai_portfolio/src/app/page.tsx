'use client';
import { useState } from 'react';
import ThreeCanvas from '@/components/three/ThreeCanvas';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';
import MessageSection from '@/components/sections/Message';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillSection from '@/components/sections/SkillSection';
import ContactSection from '@/components/sections/ContactSection';
import { useVisibleSections } from '@/hooks';
import ThreeScrollHandler from '@/components/ui/ScrollHandler';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function Home() {
  const { setVisibleSections, isVisible } = useVisibleSections();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* ローディング画面 */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* メインコンテンツ */}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <ThreeScrollHandler
          scrollSpeed={0.5}
          smoothness={0.08}
          enableSmooth={true}
        />
        <main className='h-screen'>
          <ThreeCanvas setVisibleSections={setVisibleSections} />
          <TopSection isVisible={isVisible('hello')} />
          <ProfileSection isVisible={isVisible} />
          <MessageSection />
          <ExperienceSection isVisible={isVisible} />
          <SkillSection isVisible={isVisible} />
          <ContactSection isVisible={isVisible} />
        </main>
      </div>
    </>
  );
}
