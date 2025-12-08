import CosmeContents from '@/components/cosmeContents/CosmeContents';
import { EmblaOptionsType } from 'embla-carousel';

/**
 * コスメ業界向けの横スクロールコンテンツページ
 * フッターは背面表示され、コンテンツは1画面に固定
 */
export default function CosmeContentsPage() {
  const OPTIONS: EmblaOptionsType = { axis: 'y' };

  return (
    <div className='w-screen min-h-screen bg-white lg:overflow-hidden lg:fixed lg:inset-0 lg:z-50 relative'>
      <div className="absolute inset-0 bg-[url('/assets/images/flowerLeaf.png')] bg-no-repeat bg-center bg-[length:700px_700px] md:bg-[length:700px_700px] max-md:bg-[length:400px_400px] opacity-20 pointer-events-none max-md:bg-fixed" />
      <CosmeContents options={OPTIONS} />
    </div>
  );
}
