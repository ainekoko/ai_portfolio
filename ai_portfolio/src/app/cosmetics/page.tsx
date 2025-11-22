import CosmeContents from '@/components/cosmeContents/CosmeContents';
import { EmblaOptionsType } from 'embla-carousel';

/**
 * コスメ業界向けの横スクロールコンテンツページ
 * フッターは背面表示され、コンテンツは1画面に固定
 */
export default function CosmeContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };

  return (
    <div className="w-screen h-screen bg-white overflow-hidden fixed inset-0 z-50 bg-[url('/assets/images/bg_flower_left.png')] bg-no-repeat bg-left">
      <CosmeContents options={OPTIONS} />
    </div>
  );
}
