import SesContents from '@/components/sesContents/SesContents';
import { EmblaOptionsType } from 'embla-carousel';
/**
 * SESページ
 */
export default function SesContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  const SLIDE_COUNT = 6; // ITJOB_INTRODUCTIONのデータ数に合わせる
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className='w-full h-full bg-white'>
      <SesContents slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
