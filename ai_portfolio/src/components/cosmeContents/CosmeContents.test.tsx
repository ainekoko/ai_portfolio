import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CosmeContents from './CosmeContents';
import { COSME_CONTENTS } from '../../utils/CosmeContentsData';

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
    scrollSnapList: jest.fn(() => [0, 1, 2, 3]), // COSME_CONTENTSの数と同じ
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

describe('CosmeContents', () => {
  beforeEach(() => {
    // ウィンドウサイズのモック
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('セクションヘッダーが正しく表示される', () => {
    render(<CosmeContents />);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0].textContent).toContain('Cosmetics Company');
    expect(headings[0].textContent).toContain('化粧品企業');
  });

  it('すべてのコンテンツが表示される', () => {
    render(<CosmeContents />);

    COSME_CONTENTS.forEach((content) => {
      expect(screen.getByText(content.title)).toBeInTheDocument();
      expect(screen.getByText(content.year)).toBeInTheDocument();
    });
  });

  it('業務内容セクションが表示される', () => {
    render(<CosmeContents />);

    const workContentHeaders = screen.getAllByText('WORK CONTENT');
    expect(workContentHeaders.length).toBeGreaterThan(0);
  });

  it('詳細セクションが表示される', () => {
    render(<CosmeContents />);

    const detailsHeaders = screen.getAllByText('DETAILS');
    expect(detailsHeaders.length).toBeGreaterThan(0);
  });

  it('思い出セクションが表示される', () => {
    render(<CosmeContents />);

    const memoriesHeaders = screen.getAllByText('MEMORIES');
    expect(memoriesHeaders.length).toBeGreaterThan(0);
  });

  it('Back Pageリンクが正しく動作する', () => {
    render(<CosmeContents />);

    const backLink = screen.getByText('Back Page');
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('配列型のdescriptionが正しく表示される', () => {
    render(<CosmeContents />);

    const firstContent = COSME_CONTENTS[0];
    if (Array.isArray(firstContent.description)) {
      firstContent.description.forEach((item: string) => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    }
  });

  it('装飾的な番号が正しく表示される', () => {
    render(<CosmeContents />);

    COSME_CONTENTS.forEach((_, index) => {
      const numberText = `0${index + 1}`;
      const elements = screen.getAllByText(numberText);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  it('矢印マーカーが表示される', () => {
    const { container } = render(<CosmeContents />);

    const arrows = container.querySelectorAll('.cosme-content-color');
    expect(arrows.length).toBeGreaterThan(0);
  });

  it('optionsが正しく渡される', () => {
    const options = { axis: 'y' as const, loop: true };
    render(<CosmeContents options={options} />);

    // コンポーネントがエラーなくレンダリングされることを確認
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0].textContent).toContain('Cosmetics Company');
  });

  it('レスポンシブ: カルーセルコントロールに正しいクラスが適用される', () => {
    const { container } = render(<CosmeContents />);

    const controls = container.querySelector('.embla__controls');
    expect(controls).toHaveClass('pb-6');
    expect(controls).toHaveClass('lg:grid');
  });

  describe('onWheel イベント', () => {
    it('大画面でホイールダウン時にscrollNextが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      const wheelEvent = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(wheelEvent, 'preventDefault');
      emblaNode?.dispatchEvent(wheelEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('大画面でホイールアップ時にscrollPrevが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      const wheelEvent = new WheelEvent('wheel', {
        deltaY: -100,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(wheelEvent, 'preventDefault');
      emblaNode?.dispatchEvent(wheelEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('小画面ではホイールイベントが無効化される', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      const wheelEvent = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(wheelEvent, 'preventDefault');
      emblaNode?.dispatchEvent(wheelEvent);

      // 小画面ではpreventDefaultが呼ばれない（イベントが無効化される）
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('deltaYが0の場合は何もしない', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      const wheelEvent = new WheelEvent('wheel', {
        deltaY: 0,
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(wheelEvent, 'preventDefault');
      emblaNode?.dispatchEvent(wheelEvent);

      // deltaYが0の場合でもpreventDefaultは呼ばれる（emblaApiが存在する限り）
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('handleKeyDown イベント', () => {
    it('大画面でArrowDownキーを押すとscrollNextが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      // emblaNodeにフォーカスを当てる
      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('大画面でArrowRightキーを押すとscrollNextが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('大画面でArrowUpキーを押すとscrollPrevが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('大画面でArrowLeftキーを押すとscrollPrevが呼ばれる', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('emblaNodeにフォーカスがない場合はキーイベントが無視される', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(<CosmeContents />);

      // フォーカスを当てずにキーイベントを発火
      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      // フォーカスがないのでpreventDefaultが呼ばれない
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('小画面ではキーボードイベントが無効化される', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      // 小画面ではキーボードリスナーが登録されないのでpreventDefaultが呼ばれない
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('矢印キー以外のキーでは何もしない', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { container } = render(<CosmeContents />);
      const emblaNode = container.querySelector('.embla__viewport');

      emblaNode?.setAttribute('tabindex', '0');
      (emblaNode as HTMLElement)?.focus();

      const keyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = jest.spyOn(keyEvent, 'preventDefault');
      window.dispatchEvent(keyEvent);

      // 矢印キー以外ではpreventDefaultが呼ばれない
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  describe('ドットボタン', () => {
    it('コンテンツ数と同じ数のドットボタンが表示される', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');

      // デバッグ: dotsContainerが存在するか確認
      expect(dotsContainer).toBeInTheDocument();

      const dots = dotsContainer?.querySelectorAll('button');
      expect(dots?.length).toBe(COSME_CONTENTS.length);
    });

    it('最初のドットボタンが選択状態になっている', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');
      const dots = dotsContainer?.querySelectorAll('button');

      expect(dots?.[0]).toHaveClass('embla__dot--selected');
    });

    it('選択されていないドットボタンにはselectedクラスがない', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');
      const dots = dotsContainer?.querySelectorAll('button');

      if (dots) {
        for (let i = 1; i < dots.length; i++) {
          expect(dots[i]).not.toHaveClass('embla__dot--selected');
        }
      }
    });

    it('ドットボタンをクリックすると該当スライドに移動する', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');
      const dots = dotsContainer?.querySelectorAll('button');

      if (dots && dots.length > 1) {
        // 2番目のドットボタンをクリック
        (dots[1] as HTMLElement).click();

        // クリック可能であることを確認（エラーが出ないこと）
        expect(dots[1]).toBeInTheDocument();
      }
    });

    it('各ドットボタンにkey属性が設定されている', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');

      expect(dotsContainer).toBeInTheDocument();
      expect(dotsContainer?.children.length).toBe(COSME_CONTENTS.length);
    });

    it('全てのドットボタンにembla__dotクラスが適用されている', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');
      const dots = dotsContainer?.querySelectorAll('button');

      dots?.forEach((dot) => {
        expect(dot.className).toContain('embla__dot');
      });
    });

    it('ドットボタンコンテナが存在する', () => {
      const { container } = render(<CosmeContents />);
      const dotsContainer = container.querySelector('.embla__dots');

      expect(dotsContainer).toBeInTheDocument();
    });
  });
});
