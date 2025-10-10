'use client';
import ThreeCanvas from '@/components/three/ThreeCanvas';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';
import MessageSection from '@/components/sections/Message';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillSection from '@/components/sections/SkillSection';
import ContactSection from '@/components/sections/ContactSection';
import { useVisibleSections } from '@/hooks';
import ThreeScrollHandler from '@/components/ui/ScrollHandler';

export default function Home() {
  const { setVisibleSections, isVisible } = useVisibleSections();

  return (
    <>
      <ThreeScrollHandler
        scrollSpeed={0.5} // スクロール速度（遅く: 0.1, 速く: 1.0）
        smoothness={0.08} // 滑らかさ（滑らか: 0.05, 素早く: 0.15）
        enableSmooth={true} // 滑らかスクロールのON/OFF
      />
      <main className='h-screen'>
        <ThreeCanvas setVisibleSections={setVisibleSections} />
        {/* 最初のsection */}
        <TopSection isVisible={isVisible('hello')} />
        {/* プロフィールsection */}
        <ProfileSection isVisible={isVisible} />
        {/* メッセージsection */}
        <MessageSection />
        {/* Previous Experience */}
        <ExperienceSection isVisible={isVisible} />
        {/* スキル */}
        <SkillSection isVisible={isVisible} />
        {/* message*/}
        <ContactSection isVisible={isVisible} />
      </main>
    </>
  );
}
