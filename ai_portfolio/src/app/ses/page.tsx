import SesContents from '@/components/sesContents/SesContents';
import { EmblaOptionsType } from 'embla-carousel';

export default function SesContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  return (
    <div className='w-screen min-h-screen bg-white lg:overflow-hidden lg:fixed lg:inset-0 lg:z-50 relative'>
      <div className="absolute inset-0 bg-[url('/assets/images/flowerLeaf.png')] bg-no-repeat bg-center bg-[length:700px_700px] opacity-20 pointer-events-none" />
      <SesContents options={OPTIONS} />
    </div>
  );
}
