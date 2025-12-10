'use client';
import Image from 'next/image';
import { useState } from 'react';
import SectionHeader from '@/components/common/sectionHeader/SectionHeader';
import ContactButtons from '@/components/profile/contactButtons/ContactButtons';
import { PORTFOLIO_CONTENT, DECORATION_IMAGE } from '@/utils/portfolioData';

/**
 * ポートフォリオコンテンツコンポーネント
 */
export default function PortfolioContents() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className='min-h-screen bg-white'>
      <div className='w-screen min-h-screen relative'>
        {/* 背景画像 */}
        <div className="fixed inset-0 bg-[url('/assets/images/flowerLeaf.png')] bg-no-repeat bg-center bg-[length:700px_700px] opacity-20 pointer-events-none" />

        <div className='relative z-10 max-w-[1200px] mx-auto px-6 py-16'>
          {/* タイトル */}
          <SectionHeader
            isVisible={true}
            title={PORTFOLIO_CONTENT.title}
            subtitle={PORTFOLIO_CONTENT.subtitle}
          />

          {/* コンテンツ */}
          <div className='mt-16 space-y-16'>
            {/* 作成のきっかけ */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.motivation.title}
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                {PORTFOLIO_CONTENT.motivation.paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>

            {/* 使用技術 */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.techStack.title}
                </h2>
              </div>
              <div className='pl-6'>
                <ul className='space-y-3 text-gray-700'>
                  {PORTFOLIO_CONTENT.techStack.items.map((item, index) => (
                    <li key={index} className='flex items-start gap-3'>
                      <span className='text-gray-500 text-lg mt-0.5'>▸</span>
                      <span>
                        <strong>{item.label}:</strong> {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 良かったポイント */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.goodPoints.title}
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <ul className='space-y-4'>
                  {PORTFOLIO_CONTENT.goodPoints.items.map((point, index) => (
                    <li key={index}>
                      <strong className='text-green-700'>{point.title}</strong>
                      <p className='mt-1 ml-4'>{point.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 残念ポイント */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.badPoints.title}
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                <ul className='space-y-4'>
                  {PORTFOLIO_CONTENT.badPoints.items.map((point, index) => (
                    <li key={index}>
                      <strong className='text-orange-600'>{point.title}</strong>
                      <p className='mt-1 ml-4'>{point.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Figmaで作成したデザイン */}
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Image
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.figmaDesigns.title}
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-6'>
                {PORTFOLIO_CONTENT.figmaDesigns.images.map((image, index) => (
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
                  src={DECORATION_IMAGE}
                  alt='装飾'
                  width={50}
                  height={50}
                  className='opacity-80'
                />
                <h2 className='text-lg md:text-2xl font-bold text-gray-800'>
                  {PORTFOLIO_CONTENT.future.title}
                </h2>
              </div>
              <div className='text-gray-700 leading-relaxed space-y-4 pl-6'>
                {PORTFOLIO_CONTENT.future.paragraphs.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
            </div>

            {/* Contact Buttons */}
            <ContactButtons contacts={PORTFOLIO_CONTENT.contacts} />
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
