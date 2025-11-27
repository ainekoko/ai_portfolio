import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import { renderHook } from '@testing-library/react';
import { EmblaCarouselType } from 'embla-carousel';

describe('PrevButton', () => {
  it('正しくレンダリングされる', () => {
    render(<PrevButton onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('embla__button', 'embla__button--prev');
  });

  it('クリックイベントが発火する', () => {
    const handleClick = jest.fn();
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
    const handleClick = jest.fn();
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
    const mockScrollPrev = jest.fn();
    const mockEmblaApi = {
      scrollPrev: mockScrollPrev,
      scrollNext: jest.fn(),
      canScrollPrev: jest.fn(() => true),
      canScrollNext: jest.fn(() => true),
      on: jest.fn(() => ({ on: jest.fn() })),
    } as unknown as EmblaCarouselType;

    const { result } = renderHook(() => usePrevNextButtons(mockEmblaApi));

    result.current.onPrevButtonClick();
    expect(mockScrollPrev).toHaveBeenCalledTimes(1);
  });

  it('onNextButtonClickが正しく動作する', () => {
    const mockScrollNext = jest.fn();
    const mockEmblaApi = {
      scrollPrev: jest.fn(),
      scrollNext: mockScrollNext,
      canScrollPrev: jest.fn(() => true),
      canScrollNext: jest.fn(() => true),
      on: jest.fn(() => ({ on: jest.fn() })),
    } as unknown as EmblaCarouselType;

    const { result } = renderHook(() => usePrevNextButtons(mockEmblaApi));

    result.current.onNextButtonClick();
    expect(mockScrollNext).toHaveBeenCalledTimes(1);
  });
});
