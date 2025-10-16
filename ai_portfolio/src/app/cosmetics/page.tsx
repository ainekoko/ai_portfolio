import CosmeContents from '@/components/cosmeContents/CosmeContents';
import { EmblaOptionsType } from 'embla-carousel';
/**
 * コスメ業界向けの横スクロールコンテンツページ
 */
export default function CosmeContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  const SLIDE_COUNT = 4;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  console.log(OPTIONS, SLIDES);
  return (
    <div className='w-screen h-screen bg-white overflow-hidden fixed inset-0'>
      <CosmeContents slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
