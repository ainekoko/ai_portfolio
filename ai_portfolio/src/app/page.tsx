'use client';
import ThreeCanvas from '@/components/three/ThreeCanvas';
import ProfileSection from '@/components/sections/ProfileSection';
import TopSection from '@/components/sections/TopSection';
import MessageSection from '@/components/sections/Message';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ItSection from '@/components/sections/ItSection';
import SkillSection from '@/components/sections/SkillSection';
import ContactSection from '@/components/sections/ContactSection';
import { useVisibleSections } from '@/hooks';

export default function Home() {
  const { setVisibleSections, isVisible } = useVisibleSections();

  return (
    <main className='h-screen'>
      <ThreeCanvas setVisibleSections={setVisibleSections} />
      {/* 最初のsection */}
      <TopSection isVisible={isVisible('hello')} />
      {/* プロフィールsection */}
      <ProfileSection isVisible={isVisible} />
      {/* メッセージsection */}
      <MessageSection />
      {/* Previous Experience */}
      {/* <ExperienceSection isVisible={isVisible} /> */}
      {/* IT */}
      {/* <ItSection /> */}
      {/* スキル */}
      <SkillSection isVisible={isVisible} />
      {/* message*/}
      <ContactSection isVisible={isVisible} />
    </main>
  );
}
