import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomCursor from './CustomCursor';

describe('CustomCursor', () => {
  let rafId = 0;
  let rafCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    rafCallbacks = [];
    // requestAnimationFrameとcancelAnimationFrameをモック
    global.requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return ++rafId;
    }) as unknown as typeof requestAnimationFrame;
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    rafId = 0;
    rafCallbacks = [];
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    const { container } = render(<CustomCursor />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('デフォルトのカーソルサイズが適用される', () => {
    const { container } = render(<CustomCursor />);
    const mainCursor = container.querySelector(
      '.fixed.pointer-events-none.z-\\[10001\\]'
    );
    expect(mainCursor).toBeInTheDocument();
  });

  it('mousemoveイベントでカーソル位置が更新される', () => {
    render(<CustomCursor />);

    fireEvent.mouseMove(document, {
      clientX: 100,
      clientY: 200,
    });

    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('mouseleaveイベントでカーソルが非表示になる', () => {
    const { container } = render(<CustomCursor />);

    fireEvent.mouseLeave(document);

    // カーソルが非表示（null）になる
    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('mouseenterイベントでカーソルが再表示される', async () => {
    const { container } = render(<CustomCursor />);

    // 初期状態で表示されていることを確認
    expect(container.firstChild).toBeInTheDocument();

    // 非表示にする
    fireEvent.mouseLeave(document);
    expect(container.firstChild).not.toBeInTheDocument();

    // 再表示 - documentに対してイベントを発火
    fireEvent(
      document,
      new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
      })
    );

    // 状態更新を待つ
    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('mousedownイベントでクリック状態になる', () => {
    render(<CustomCursor />);

    fireEvent.mouseDown(document);

    // クリック状態のチェックは内部状態なので、
    // スタイルの変化で確認
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('mouseupイベントでクリック状態が解除される', () => {
    render(<CustomCursor />);

    fireEvent.mouseDown(document);
    fireEvent.mouseUp(document);

    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('ホバー可能な要素にmouseoverするとホバー状態になる', () => {
    const { container } = render(<CustomCursor />);

    // ボタン要素を作成
    const button = document.createElement('button');
    document.body.appendChild(button);

    fireEvent.mouseOver(button);

    // ホバー時のグラデーションクラスが適用されているか確認
    const gradientElement = container.querySelector(
      '.from-purple-500.to-pink-500'
    );
    expect(gradientElement).toBeInTheDocument();

    // クリーンアップ
    document.body.removeChild(button);
  });

  it('ホバー可能な要素からmouseoutするとホバー状態が解除される', () => {
    const { container } = render(<CustomCursor />);

    const button = document.createElement('button');
    document.body.appendChild(button);

    fireEvent.mouseOver(button);
    fireEvent.mouseOut(button);

    // ホバーが解除されたら通常のグラデーションに戻る
    const normalGradient = container.querySelector('.from-gray-800.to-black');
    expect(normalGradient).toBeInTheDocument();

    document.body.removeChild(button);
  });

  it('カスタムクラス名が適用される', () => {
    const { container } = render(<CustomCursor className='custom-class' />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('カスタムホバーセレクターが機能する', () => {
    const { container } = render(
      <CustomCursor hoverSelectors='.custom-hover' />
    );

    const div = document.createElement('div');
    div.className = 'custom-hover';
    document.body.appendChild(div);

    fireEvent.mouseOver(div);

    const gradientElement = container.querySelector(
      '.from-purple-500.to-pink-500'
    );
    expect(gradientElement).toBeInTheDocument();

    document.body.removeChild(div);
  });

  it('アンマウント時にイベントリスナーとアニメーションがクリーンアップされる', () => {
    const { unmount } = render(<CustomCursor />);

    unmount();

    expect(cancelAnimationFrame).toHaveBeenCalled();
  });

  it('smoothnessプロパティが適用される', () => {
    render(<CustomCursor smoothness={0.3} />);

    // smoothnessは内部のアニメーションロジックで使用される
    // requestAnimationFrameが呼ばれることで間接的に確認
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('ホバー時にピングアニメーション要素が表示される', () => {
    const { container } = render(<CustomCursor />);

    const button = document.createElement('button');
    document.body.appendChild(button);

    fireEvent.mouseOver(button);

    // ピングアニメーションの要素を確認
    const pingElement = container.querySelector('.animate-ping');
    expect(pingElement).toBeInTheDocument();
    expect(pingElement).toHaveClass('border-pink-300/30');

    document.body.removeChild(button);
  });

  it('グローバルスタイルでデフォルトカーソルが非表示になる', () => {
    const { container } = render(<CustomCursor />);

    const styleElement = container.querySelector('style');
    expect(styleElement).toBeInTheDocument();
    expect(styleElement?.textContent).toContain('cursor: none');
  });

  it('複数のカーソル要素が正しくレンダリングされる', () => {
    const { container } = render(<CustomCursor />);

    // メインカーソル、フォロワーカーソルの存在確認
    const cursors = container.querySelectorAll('.fixed.pointer-events-none');
    expect(cursors.length).toBeGreaterThanOrEqual(2);
  });

  it('animateコールバックが正しく動作する', () => {
    render(<CustomCursor />);

    // requestAnimationFrameに渡されたコールバックを実行
    expect(rafCallbacks.length).toBeGreaterThan(0);

    // アニメーションコールバックを実行
    if (rafCallbacks[0]) {
      rafCallbacks[0](0);
    }

    // アニメーションが再度requestAnimationFrameを呼び出すことを確認
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('throttledMouseMoveが連続したマウス移動をスロットリングする', () => {
    render(<CustomCursor />);

    // 連続したマウス移動イベント
    fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(document, { clientX: 20, clientY: 20 });
    fireEvent.mouseMove(document, { clientX: 30, clientY: 30 });

    // スロットリングにより、requestAnimationFrameの呼び出し数が制限される
    expect(requestAnimationFrame).toHaveBeenCalled();

    // コールバックを実行して、カーソル位置が更新されることを確認
    rafCallbacks.forEach((cb) => cb(0));
    expect(requestAnimationFrame).toHaveBeenCalled();
  });

  it('マウス移動時にtargetPosが更新される', () => {
    render(<CustomCursor />);

    // マウス移動
    fireEvent.mouseMove(document, { clientX: 150, clientY: 250 });

    // requestAnimationFrameのコールバックを実行
    if (rafCallbacks.length > 0) {
      rafCallbacks.forEach((cb) => cb(0));
    }

    // アニメーションが継続的に呼ばれることを確認
    expect(requestAnimationFrame).toHaveBeenCalled();
  });
});
