import SectionHeader from '@/components/common/SectionHeader';
import EmblaCarousel from '@/components/cosmeContents/CosmeContents';
import { EmblaOptionsType } from 'embla-carousel';
/**
 * コスメ業界向けの横スクロールコンテンツページ
 */
export default function CosmeContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </>
  );
}
