import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageIndicator from './PageIndicator';
import { useRef } from 'react';

const mockSections = [
  {
    title: 'ネイリスト',
    color: '#ff6b9d',
    year: '2011~2014',
    description: '店舗接客',
  },
  {
    title: 'ルート営業',
    color: '#c44569',
    year: '2012~2014',
    description: '店舗へ直接出向き',
  },
  {
    title: 'マーケティング',
    color: '#4a90e2',
    year: '2014~2016',
    description: 'データ分析',
  },
];

const TestWrapper = ({ currentIndex = 0 }: { currentIndex?: number }) => {
  const containerRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );
  return (
    <>
      <div ref={containerRef} data-testid='container' />
      <PageIndicator
        sections={mockSections}
        containerRef={containerRef}
        currentIndex={currentIndex}
      />
    </>
  );
};

describe('PageIndicator', () => {
  it('正しい数のボタンがレンダリングされる', () => {
    render(<TestWrapper />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockSections.length);
  });

  it('currentIndexに対応するボタンがアクティブ状態になる', () => {
    render(<TestWrapper currentIndex={1} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveClass('bg-white/40');
    expect(buttons[1]).toHaveClass('bg-white', 'scale-125');
    expect(buttons[2]).toHaveClass('bg-white/40');
  });

  it('最初のボタンがデフォルトでアクティブ', () => {
    render(<TestWrapper currentIndex={0} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons[0]).toHaveClass('bg-white', 'scale-125');
  });

  it('最後のボタンをアクティブにできる', () => {
    render(<TestWrapper currentIndex={2} />);
    const buttons = screen.getAllByRole('button');

    expect(buttons[2]).toHaveClass('bg-white', 'scale-125');
  });

  it('各ボタンに適切なaria-labelが設定されている', () => {
    render(<TestWrapper />);

    mockSections.forEach((_, index) => {
      const button = screen.getByLabelText(
        `${index + 1}番目のセクションへ移動`
      );
      expect(button).toBeInTheDocument();
    });
  });

  it('ボタンをクリックすると適切な位置にスクロールする', () => {
    const mockScrollTo = jest.fn();

    const TestWrapperWithMock = () => {
      const containerRef = useRef<HTMLDivElement>({
        scrollTo: mockScrollTo,
      } as unknown as HTMLDivElement);
      return (
        <PageIndicator
          sections={mockSections}
          containerRef={containerRef}
          currentIndex={0}
        />
      );
    };

    render(<TestWrapperWithMock />);

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(mockScrollTo).toHaveBeenCalledWith({
      left: window.innerWidth,
      behavior: 'smooth',
    });
  });

  it('containerRefがnullの場合でもエラーが発生しない', () => {
    const containerRef = {
      current: null,
    } as unknown as React.RefObject<HTMLDivElement>;

    render(
      <PageIndicator
        sections={mockSections}
        containerRef={containerRef}
        currentIndex={0}
      />
    );

    const button = screen.getAllByRole('button')[0];
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('正しいクラス名が適用されている', () => {
    const { container } = render(<TestWrapper />);

    const wrapper = container.querySelector('.fixed.top-1\\/2.right-8');
    expect(wrapper).toBeInTheDocument();
  });

  it('ホバー時にスタイルが変更される', () => {
    render(<TestWrapper currentIndex={0} />);
    const buttons = screen.getAllByRole('button');

    // 非アクティブなボタンはホバークラスを持つ
    expect(buttons[1]).toHaveClass('hover:bg-white/60');
  });
});
