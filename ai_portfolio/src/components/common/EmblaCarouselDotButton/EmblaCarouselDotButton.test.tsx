import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import { renderHook } from '@testing-library/react';
import { EmblaCarouselType } from 'embla-carousel';

describe('DotButton', () => {
  it('正しくレンダリングされる', () => {
    render(<DotButton onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
  });

  it('クリックイベントが発火する', () => {
    const handleClick = jest.fn();
    render(<DotButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('classNameが正しく適用される', () => {
    render(<DotButton onClick={() => {}} className='custom-class' />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('childrenが正しくレンダリングされる', () => {
    render(<DotButton onClick={() => {}}>Test Content</DotButton>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('disabled状態が正しく適用される', () => {
    render(<DotButton onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('その他のpropsが正しく渡される', () => {
    render(
      <DotButton
        onClick={() => {}}
        aria-label='Test dot button'
        data-testid='dot-button'
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Test dot button');
    expect(button).toHaveAttribute('data-testid', 'dot-button');
  });
});

describe('useDotButton', () => {
  it('emblaApiがundefinedの場合、初期状態を返す', () => {
    const { result } = renderHook(() => useDotButton(undefined));

    expect(result.current.selectedIndex).toBe(0);
    expect(result.current.scrollSnaps).toEqual([]);
  });

  it('onDotButtonClickが正しく動作する', () => {
    const mockScrollTo = jest.fn();
    const mockEmblaApi = {
      scrollTo: mockScrollTo,
      scrollSnapList: jest.fn(() => [0, 1, 2, 3]),
      selectedScrollSnap: jest.fn(() => 0),
      on: jest.fn(() => ({ on: jest.fn(() => ({ on: jest.fn() })) })),
    } as unknown as EmblaCarouselType;

    const { result } = renderHook(() => useDotButton(mockEmblaApi));

    result.current.onDotButtonClick(2);
    expect(mockScrollTo).toHaveBeenCalledWith(2);
  });

  it('scrollSnapsが正しく設定される', () => {
    const mockScrollSnapList = [0, 1, 2, 3];
    const mockEmblaApi = {
      scrollTo: jest.fn(),
      scrollSnapList: jest.fn(() => mockScrollSnapList),
      selectedScrollSnap: jest.fn(() => 0),
      on: jest.fn(() => ({ on: jest.fn(() => ({ on: jest.fn() })) })),
    } as unknown as EmblaCarouselType;

    const { result } = renderHook(() => useDotButton(mockEmblaApi));

    expect(result.current.scrollSnaps).toEqual(mockScrollSnapList);
  });

  it('selectedIndexが正しく設定される', () => {
    const mockEmblaApi = {
      scrollTo: jest.fn(),
      scrollSnapList: jest.fn(() => [0, 1, 2, 3]),
      selectedScrollSnap: jest.fn(() => 2),
      on: jest.fn(() => ({ on: jest.fn(() => ({ on: jest.fn() })) })),
    } as unknown as EmblaCarouselType;

    const { result } = renderHook(() => useDotButton(mockEmblaApi));

    expect(result.current.selectedIndex).toBe(2);
  });

  it('emblaApiがundefinedの場合、onDotButtonClickは何もしない', () => {
    const { result } = renderHook(() => useDotButton(undefined));

    // エラーが発生しないことを確認
    expect(() => result.current.onDotButtonClick(0)).not.toThrow();
  });
});
