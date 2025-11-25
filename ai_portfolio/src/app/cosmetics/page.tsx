import CosmeContents from '@/components/cosmeContents/CosmeContents';
import { EmblaOptionsType } from 'embla-carousel';

/**
 * コスメ業界向けの横スクロールコンテンツページ
 * フッターは背面表示され、コンテンツは1画面に固定
 */
export default function CosmeContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };

  return (
    <div className="w-screen min-h-screen bg-white lg:overflow-hidden lg:fixed lg:inset-0 lg:z-50 bg-[url('/assets/images/bg_flower_left.png')] bg-no-repeat bg-left">
      <CosmeContents options={OPTIONS} />
    </div>
  );
}
