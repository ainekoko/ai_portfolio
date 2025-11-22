import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { renderHook } from '@testing-library/react';

describe('PrevButton', () => {
  it('正しくレンダリングされる', () => {
    render(<PrevButton onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('embla__button', 'embla__button--prev');
  });

  it('クリックイベントが発火する', () => {
    const handleClick = vi.fn();
    render(<PrevButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態が正しく適用される', () => {
    render(<PrevButton onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('SVGアイコンが含まれている', () => {
    const { container } = render(<PrevButton onClick={() => {}} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('embla__button__svg');
  });

  it('childrenが正しくレンダリングされる', () => {
    render(<PrevButton onClick={() => {}}>Previous</PrevButton>);
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });
});

describe('NextButton', () => {
  it('正しくレンダリングされる', () => {
    render(<NextButton onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('embla__button', 'embla__button--next');
  });

  it('クリックイベントが発火する', () => {
    const handleClick = vi.fn();
    render(<NextButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabled状態が正しく適用される', () => {
    render(<NextButton onClick={() => {}} disabled />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('SVGアイコンが含まれている', () => {
    const { container } = render(<NextButton onClick={() => {}} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('embla__button__svg');
  });

  it('childrenが正しくレンダリングされる', () => {
    render(<NextButton onClick={() => {}}>Next</NextButton>);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});

describe('usePrevNextButtons', () => {
  it('emblaApiがundefinedの場合、初期状態を返す', () => {
    const { result } = renderHook(() => usePrevNextButtons(undefined));

    expect(result.current.prevBtnDisabled).toBe(true);
    expect(result.current.nextBtnDisabled).toBe(true);
  });

  it('onPrevButtonClickが正しく動作する', () => {
    const mockScrollPrev = vi.fn();
    const mockEmblaApi = {
      scrollPrev: mockScrollPrev,
      scrollNext: vi.fn(),
      canScrollPrev: vi.fn(() => true),
      canScrollNext: vi.fn(() => true),
      on: vi.fn(() => ({ on: vi.fn() })),
    } as any;

    const { result } = renderHook(() => usePrevNextButtons(mockEmblaApi));

    result.current.onPrevButtonClick();
    expect(mockScrollPrev).toHaveBeenCalledTimes(1);
  });

  it('onNextButtonClickが正しく動作する', () => {
    const mockScrollNext = vi.fn();
    const mockEmblaApi = {
      scrollPrev: vi.fn(),
      scrollNext: mockScrollNext,
      canScrollPrev: vi.fn(() => true),
      canScrollNext: vi.fn(() => true),
      on: vi.fn(() => ({ on: vi.fn() })),
    } as any;

    const { result } = renderHook(() => usePrevNextButtons(mockEmblaApi));

    result.current.onNextButtonClick();
    expect(mockScrollNext).toHaveBeenCalledTimes(1);
  });
});
