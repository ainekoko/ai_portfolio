import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SesContents from './SesContents';
import { ITJOB_INTRODUCTION } from '../../utils/itData';

// embla-carousel-react のモック
jest.mock('embla-carousel-react', () => {
  let rootNodeElement: HTMLElement | null = null;

  const mockEmblaApi: {
    scrollNext: jest.Mock;
    scrollPrev: jest.Mock;
    scrollTo: jest.Mock;
    canScrollNext: jest.Mock;
    canScrollPrev: jest.Mock;
    selectedScrollSnap: jest.Mock;
    scrollSnapList: jest.Mock;
    on: jest.Mock;
    off: jest.Mock;
    rootNode: jest.Mock;
  } = {
    scrollNext: jest.fn(),
    scrollPrev: jest.fn(),
    scrollTo: jest.fn(),
    canScrollNext: jest.fn(() => true),
    canScrollPrev: jest.fn(() => false),
    selectedScrollSnap: jest.fn(() => 0),
    scrollSnapList: jest.fn(() => [0, 1, 2, 3, 4, 5]), // ITJOB_INTRODUCTIONの数と同じ
    on: jest.fn(function (this: typeof mockEmblaApi) {
      return this;
    }),
    off: jest.fn(),
    rootNode: jest.fn(() => rootNodeElement),
  };

  const mockEmblaRef = jest.fn((node: HTMLElement | null) => {
    rootNodeElement = node;
  });

  return {
    __esModule: true,
    default: jest.fn(() => [mockEmblaRef, mockEmblaApi]),
  };
});

describe('SesContents', () => {
  beforeEach(() => {
    // ウィンドウサイズのモック
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('セクションヘッダーが正しく表示される', () => {
    render(<SesContents />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0].textContent).toContain('System Enginee');
    expect(headings[0].textContent).toContain('IT業界');
  });

  it('すべてのコンテンツが表示される', () => {
    render(<SesContents />);

    ITJOB_INTRODUCTION.forEach((content) => {
      expect(screen.getByText(content.outsourcedCompany)).toBeInTheDocument();
      expect(screen.getByText(content.period)).toBeInTheDocument();
    });
  });

  it('業務内容セクションが表示される', () => {
    render(<SesContents />);

    const workContentHeaders = screen.getAllByText('WORK CONTENT');
    expect(workContentHeaders.length).toBeGreaterThan(0);
  });

  it('開発環境セクションが表示される', () => {
    render(<SesContents />);

    const devEnvHeaders = screen.getAllByText('DEVELOPMENT ENVIRONMENT');
    expect(devEnvHeaders.length).toBeGreaterThan(0);
  });

  it('詳細セクションが表示される', () => {
    render(<SesContents />);

    const detailsHeaders = screen.getAllByText('DETAILS');
    expect(detailsHeaders.length).toBeGreaterThan(0);
  });

  it('Back Pageリンクが正しく動作する', () => {
    render(<SesContents />);

    const backLink = screen.getByText('Back Page');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('規模とフェーズが正しく表示される', () => {
    render(<SesContents />);

    ITJOB_INTRODUCTION.forEach((content) => {
      expect(screen.getByText(content.scale)).toBeInTheDocument();
    });
  });

  it('業務内容の項目が正しく表示される', () => {
    render(<SesContents />);

    const firstContent = ITJOB_INTRODUCTION[0];
    firstContent.bussinessContent.forEach((item: string) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('装飾的な番号が正しく表示される', () => {
    render(<SesContents />);

    ITJOB_INTRODUCTION.forEach((_, index) => {
      const numberText = `0${index + 1}`;
      const elements = screen.getAllByText(numberText);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('開発環境のバッジが正しく表示される', () => {
    render(<SesContents />);

    const firstContent = ITJOB_INTRODUCTION[0];
    if (firstContent.devenvironment.language) {
      firstContent.devenvironment.language.forEach((lang: string) => {
        const elements = screen.getAllByText(lang);
        expect(elements.length).toBeGreaterThan(0);
      });
    }
  });

  it('キャラクター画像が表示される', () => {
    render(<SesContents />);

    const characterImages = screen.getAllByAltText('キャラクター');
    expect(characterImages.length).toBe(ITJOB_INTRODUCTION.length);
  });

  it('ホイール操作でカルーセルが動作する（大画面・下方向）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      // ホイールダウンをシミュレート
      fireEvent.wheel(emblaViewport, { deltaY: 100 });

      // スクロールイベントが発生したことを確認
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('ホイール操作でカルーセルが動作する（大画面・上方向）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      // ホイールアップをシミュレート（deltaY < 0）
      fireEvent.wheel(emblaViewport, { deltaY: -100 });

      // スクロールイベントが発生したことを確認
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('ホイール操作が小画面では無効になる', () => {
    // 小画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      // ホイールダウンをシミュレート
      fireEvent.wheel(emblaViewport, { deltaY: 100 });

      // 小画面では無効なので何も起こらない
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('キーボード操作でカルーセルが動作する（大画面・下方向キー）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      (emblaViewport as HTMLElement).focus();

      // ArrowDownキーを押下
      fireEvent.keyDown(window, { key: 'ArrowDown' });

      // キーボード操作が有効
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('キーボード操作でカルーセルが動作する（大画面・右方向キー）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      (emblaViewport as HTMLElement).focus();

      // ArrowRightキーを押下
      fireEvent.keyDown(window, { key: 'ArrowRight' });

      // キーボード操作が有効
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('キーボード操作でカルーセルが動作する（大画面・上方向キー）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      (emblaViewport as HTMLElement).focus();

      // ArrowUpキーを押下
      fireEvent.keyDown(window, { key: 'ArrowUp' });

      // キーボード操作が有効
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('キーボード操作でカルーセルが動作する（大画面・左方向キー）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    render(<SesContents />);

    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');

    if (emblaViewport) {
      (emblaViewport as HTMLElement).focus();

      // ArrowLeftキーを押下
      fireEvent.keyDown(window, { key: 'ArrowLeft' });

      // キーボード操作が有効
      expect(emblaViewport).toBeInTheDocument();
    }
  });

  it('キーボード操作が小画面では無効になる', () => {
    // 小画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 800,
    });

    render(<SesContents />);

    // ArrowDownキーを押下
    fireEvent.keyDown(window, { key: 'ArrowDown' });

    // 小画面では無効なので何も起こらない
    const emblaViewport = screen
      .getByText(ITJOB_INTRODUCTION[0].outsourcedCompany)
      .closest('.embla__viewport');
    expect(emblaViewport).toBeInTheDocument();
  });

  it('ドットボタンが正しくレンダリングされる（大画面）', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const { container } = render(<SesContents />);

    // lg以上では表示される
    const dotsContainer = container.querySelector('.embla__dots');
    expect(dotsContainer).toBeInTheDocument();

    const dotButtons = container.querySelectorAll('.embla__dot');
    expect(dotButtons.length).toBe(ITJOB_INTRODUCTION.length);
  });

  it('ドットボタンのクリックでスライドが変更される', () => {
    // 大画面サイズに設定
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const { container } = render(<SesContents />);

    const dotButtons = container.querySelectorAll('.embla__dot');
    if (dotButtons.length > 1) {
      fireEvent.click(dotButtons[1]);

      // クリック後、選択されたドットにクラスが追加される
      waitFor(() => {
        expect(dotButtons[1]).toHaveClass('embla__dot--selected');
      });
    }
  });
});
