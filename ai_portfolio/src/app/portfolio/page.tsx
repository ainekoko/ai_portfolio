'use client';
import Image from 'next/image';
import { useState } from 'react';
import SectionHeader from '@/components/common/sectionHeader/SectionHeader';
import ContactButtons from '@/components/profile/contactButtons/ContactButtons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function PortfolioContentsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: '/assets/images/HOME.png',
      alt: 'HOMEページのデザインカンプ',
      title: 'HOMEページ',
    },
    {
      src: '/assets/images/cosme.png',
      alt: '化粧品業界ページのデザインカンプ',
      title: '化粧品業界ページ',
    },
    {
      src: '/assets/images/portforio.png',
      alt: 'ポートフォリオページのデザインカンプ',
      title: 'ポートフォリオページ',
    },
  ];

  return (
    <section className='min-h-screen bg-white'>
      <div className='w-screen min-h-screen relative'>
        {/* 背景画像 */}
        <div className="fixed inset-0 bg-[url('/assets/images/flowerLeaf.png')] bg-no-repeat bg-center bg-[length:700px_700px] opacity-20 pointer-events-none" />

        <div className='relative z-10 max-w-[1200px] mx-auto px-6 py-16'>
          {/* タイトル */}
          <SectionHeader
            isVisible={true}
            title='Portfolio'
            subtitle='このポートフォリオについて'
          />

          {/* コンテンツ */}
          <div className='mt-16 space-y-16'>
            {/* 作成のきっかけ */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  ポートフォリオを作成したきっかけ
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <p>
                  転職活動を始めるにあたり、これまでの経験やスキルを効果的に伝えるためにポートフォリオサイトを作成しました。
                </p>
                <p>
                  特に、化粧品業界とIT業界という異なる分野での経験を持つ私にとって、
                  それぞれの経験で培ったスキルや成長の過程を視覚的に表現することが重要だと考えました。
                </p>
              </div>
            </div>

            {/* 使用技術 */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  使用技術
                </h2>
              </div>
              <div className='pl-6'>
                <ul className='space-y-3 text-gray-700'>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>フレームワーク：</strong>Next.js 15 (App Router)
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>言語：</strong>TypeScript
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>スタイリング：</strong>Tailwind CSS
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>テスト：</strong>JEST, React Testing Library
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>UI開発・ドキュメント：</strong>Storybook
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>デザインツール：</strong>Figma
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>バージョン管理：</strong>Git, GitHub
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>ホスティング：</strong>Vercel
                    </span>
                  </li>
                  <li className='flex items-center gap-3'>
                    <span className='w-2 h-2 bg-rose-400 rounded-full'></span>
                    <span>
                      <strong>開発支援：</strong>GitHub Copilot
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 良かったポイント */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  良かったポイント
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <ul className='space-y-4'>
                  <li>
                    <strong className='text-green-700'>
                      ✓ レスポンシブデザイン：
                    </strong>
                    <p className='mt-1 ml-4'>
                      PC、タブレット、スマートフォンなど、あらゆるデバイスで快適に閲覧できるよう設計しました。
                    </p>
                  </li>
                  <li>
                    <strong className='text-green-700'>
                      ✓ アニメーション：
                    </strong>
                    <p className='mt-1 ml-4'>
                      ページ遷移やスクロールに合わせた滑らかなアニメーションで、ユーザー体験を向上させました。
                    </p>
                  </li>
                  <li>
                    <strong className='text-green-700'>
                      ✓ アクセシビリティ：
                    </strong>
                    <p className='mt-1 ml-4'>
                      セマンティックHTMLとARIA属性を活用し、すべてのユーザーが利用しやすいサイトを実現しました。
                    </p>
                  </li>
                  <li>
                    <strong className='text-green-700'>
                      ✓ パフォーマンス最適化：
                    </strong>
                    <p className='mt-1 ml-4'>
                      Next.jsの機能を活用し、高速なページロードを実現しました。
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* 残念ポイント */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  残念ポイント
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <ul className='space-y-4'>
                  <li>
                    <strong className='text-orange-600'>
                      △ フォルダ設計の曖昧：
                    </strong>
                    <p className='mt-1 ml-4'>
                      コンポーネントの配置やディレクトリ構造に一貫性が欠け、保守性や拡張性の面で改善の余地があります。
                    </p>
                  </li>
                  <li>
                    <strong className='text-orange-600'>
                      △ アニメーションの技術不足：
                    </strong>
                    <p className='mt-1 ml-4'>
                      当初、three.jsを使用した3Dアニメーションを検討しましたが、spサイズにした際のバグや他のバグ表示に悩まされ、最終的に断念しました。
                    </p>
                  </li>
                  <li>
                    <strong className='text-orange-600'>
                      △ コンポーネントの再利用性：
                    </strong>
                    <p className='mt-1 ml-4'>
                      一部のコンポーネントが特定のページに依存しており、他のプロジェクトでの再利用が難しかったり、冗長なコードが発生したりしました。
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Figmaで作成したデザイン */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  Figmaで作成したデザインカンプ
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-6'>
                {images.map((image, index) => (
                  <div key={index} className='space-y-3'>
                    <div
                      className='relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer'
                      onClick={() => setSelectedImage(image.src)}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className='object-cover object-top'
                      />
                    </div>
                    <p className='text-center text-sm text-gray-600'>
                      {image.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 今後の展望 */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src='/assets/images/flowerLeaf.png'
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  今後の展望
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <p>
                  今後は、自身のマイページ能の追加や、API連携による動的コンテンツの導入など、さらなる機能拡充を目指しています。
                </p>
                <p>
                  そして、webGLやthree.jsを活用した高度なアニメーション表現にも興味があるので勉強をしていきたいと思っています。
                </p>
              </div>
            </div>
            {/* Contact Buttons */}
            <ContactButtons
              contacts={[
                {
                  icon: faGithub,
                  text: 'GitHub',
                  fullText: 'https://github.com/ainekoko',
                  color: 'purple-400' as const,
                  href: 'https://github.com/ainekoko',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* モーダル */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/90 z-200 flex items-center justify-center p-4'
          onClick={() => setSelectedImage(null)}
        >
          <div className='relative max-w-7xl max-h-[90vh] w-full h-full'>
            <button
              onClick={() => setSelectedImage(null)}
              className='absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10'
              aria-label='閉じる'
            >
              ×
            </button>
            <div className='relative w-full h-full'>
              <Image
                src={selectedImage}
                alt='デザインカンプ拡大表示'
                fill
                className='object-contain'
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
