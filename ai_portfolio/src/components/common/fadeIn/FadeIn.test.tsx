import { render, screen, waitFor } from '@testing-library/react';
import FadeInElement from './FadeIn';

// IntersectionObserver のモック
const mockIntersectionObserver = jest.fn();
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

describe('FadeInElement', () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();

    // IntersectionObserverのモック実装
    mockIntersectionObserver.mockImplementation((callback) => {
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        callback,
      };
    });

    global.IntersectionObserver =
      mockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(
      <FadeInElement>
        <div>Test Content</div>
      </FadeInElement>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('childrenが正しく表示される', () => {
    render(
      <FadeInElement>
        <div>Hello World</div>
      </FadeInElement>
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('IntersectionObserverが呼び出される', () => {
    render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('observeメソッドが呼び出される', () => {
    render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    expect(mockObserve).toHaveBeenCalled();
  });

  it('デフォルトのdirectionが"up"である', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transform).toContain('translateY(50px)');
  });

  it('direction="down"で正しいtransformが適用される', () => {
    const { container } = render(
      <FadeInElement direction='down'>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transform).toContain('translateY(-50px)');
  });

  it('direction="left"で正しいtransformが適用される', () => {
    const { container } = render(
      <FadeInElement direction='left'>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transform).toContain('translateX(50px)');
  });

  it('direction="right"で正しいtransformが適用される', () => {
    const { container } = render(
      <FadeInElement direction='right'>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transform).toContain('translateX(-50px)');
  });

  it('初期状態でopacityが0である', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.opacity).toBe('0');
  });

  it('delayプロパティが正しく適用される', () => {
    const { container } = render(
      <FadeInElement delay={0.5}>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transition).toContain('0.5s');
  });

  it('デフォルトのdelayが0である', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transition).toContain('0s');
  });

  it('transitionプロパティにopacityとtransformが含まれる', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transition).toContain('opacity');
    expect(element.style.transition).toContain('transform');
  });

  it('will-changeプロパティが設定される', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.willChange).toBe('opacity, transform');
  });

  it('IntersectionObserverのthresholdが0.05である', () => {
    render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const observerOptions = mockIntersectionObserver.mock.calls[0][1];
    expect(observerOptions.threshold).toBe(0.05);
  });

  it('IntersectionObserverのrootMarginが"50px"である', () => {
    render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const observerOptions = mockIntersectionObserver.mock.calls[0][1];
    expect(observerOptions.rootMargin).toBe('50px');
  });

  it('アンマウント時にunobserveが呼ばれる', () => {
    const { unmount } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    unmount();

    expect(mockUnobserve).toHaveBeenCalled();
  });

  it('複数の子要素を持つことができる', () => {
    render(
      <FadeInElement>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </FadeInElement>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('空のchildrenでもエラーが発生しない', () => {
    const { container } = render(<FadeInElement />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('異なるdelayを持つ複数のFadeInElementがレンダリングされる', () => {
    const { container } = render(
      <>
        <FadeInElement delay={0}>
          <div>Element 1</div>
        </FadeInElement>
        <FadeInElement delay={0.5}>
          <div>Element 2</div>
        </FadeInElement>
        <FadeInElement delay={1}>
          <div>Element 3</div>
        </FadeInElement>
      </>
    );

    const elements = container.querySelectorAll('div[style]');
    expect(elements.length).toBeGreaterThanOrEqual(3);
  });

  it('transition durationが1.5秒である', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transition).toContain('1.5s');
  });

  it('transition timing functionがease-outである', () => {
    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transition).toContain('ease-out');
  });

  it('不正なdirectionの場合、デフォルトのtransformが適用される', () => {
    const { container } = render(
      <FadeInElement direction={'invalid' as 'up'}>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild as HTMLElement;
    expect(element.style.transform).toContain('translateY(50px)');
  });

  it('IntersectionObserverのコールバック内でcurrentRefが存在する場合、unobserveが呼ばれる', async () => {
    let intersectionCallback:
      | ((
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver
        ) => void)
      | null = null;

    mockIntersectionObserver.mockImplementation((callback) => {
      intersectionCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });

    const { container } = render(
      <FadeInElement>
        <div>Test</div>
      </FadeInElement>
    );

    const element = container.firstChild;

    // IntersectionObserverのコールバックをシミュレート（isIntersecting: true）
    if (intersectionCallback && element) {
      (
        intersectionCallback as (
          entries: IntersectionObserverEntry[],
          observer: IntersectionObserver
        ) => void
      )(
        [
          {
            isIntersecting: true,
            target: element,
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver
      );
    }

    await waitFor(() => {
      // コールバック内でunobserveが呼ばれることを確認（16-19行目）
      expect(mockUnobserve).toHaveBeenCalled();
    });
  });
});
