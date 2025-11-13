// src/components/experience/BackgroundScrollText.tsx
interface BackgroundScrollTextProps {
  text: string;
  position?: 'top' | 'bottom' | 'custom';
  customTop?: string;
}

/**
 * BackgroundScrollText - 背景スクロールテキストコンポーネント
 * @param text: string,
 * @param position?: 'top' | 'bottom' | 'custom',
 * @param customTop?: string,
 */
const BackgroundScrollText = ({
  text,
  position = 'top',
  customTop,
}: BackgroundScrollTextProps) => {
  const repeatedText = `${text} `.repeat(4);

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0',
    custom: '',
  };

  const positionStyle =
    position === 'custom' && customTop ? { top: customTop } : {};

  return (
    <div
      className={`absolute ${positionClasses[position]} left-0 flex w-full h-[120px] md:h-[180px] overflow-hidden pointer-events-none`}
      style={{ ...positionStyle }}
      aria-hidden='true'
    >
      <div className='flex-none whitespace-nowrap text-[80px] md:text-[150px] overflow-hidden text-gray-100 animate-loop'>
        {repeatedText}
      </div>
      <div className='flex-none whitespace-nowrap text-[80px] md:text-[150px] overflow-hidden text-gray-200 animate-loop2'>
        {repeatedText}
      </div>
    </div>
  );
};

export default BackgroundScrollText;
