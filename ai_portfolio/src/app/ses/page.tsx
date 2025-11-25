import SesContents from '@/components/sesContents/SesContents';
import { EmblaOptionsType } from 'embla-carousel';

export default function SesContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  return (
    <div className="w-screen min-h-screen bg-white lg:overflow-hidden lg:fixed lg:inset-0 lg:z-50 bg-[url('/assets/images/bg_flower_left.png')] bg-no-repeat bg-left">
      <SesContents options={OPTIONS} />
    </div>
  );
}
