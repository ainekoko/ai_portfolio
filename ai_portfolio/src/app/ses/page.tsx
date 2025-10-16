import SesContents from '@/components/sesContents/SesContents';
import { EmblaOptionsType } from 'embla-carousel';

export default function SesContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  const SLIDE_COUNT = 6;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <div className='w-screen h-screen bg-white overflow-hidden fixed inset-0'>
      {' '}
      {/* 修正 */}
      <SesContents slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
