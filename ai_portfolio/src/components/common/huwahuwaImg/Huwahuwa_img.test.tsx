import { render, screen } from '@testing-library/react';
import Huwahuwa_img from './huwahuwa_img';

describe('Huwahuwa_img', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト画像' top='50px' left='50px' />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('画像が正しく表示される', () => {
    render(<Huwahuwa_img image='test.png' name='テスト画像' />);
    const img = screen.getByAltText('テスト画像');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/assets/images/test.png');
  });

  it('画像のaltテキストが正しく設定される', () => {
    const altText = 'サンプル画像';
    render(<Huwahuwa_img image='sample.png' name={altText} />);
    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });

  it('top位置が正しく適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' top='100px' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.top).toBe('100px');
  });

  it('right位置が正しく適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' right='200px' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.right).toBe('200px');
  });

  it('left位置が正しく適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' left='150px' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.left).toBe('150px');
  });

  it('bottom位置が正しく適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' bottom='80px' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.bottom).toBe('80px');
  });

  it('デフォルトのアニメーションクラスがfloatである', () => {
    render(<Huwahuwa_img image='test.png' name='テスト' />);
    const img = screen.getByAltText('テスト');
    expect(img).toHaveClass('animate-float');
  });

  it('move="sway"でanimate-swayクラスが適用される', () => {
    render(<Huwahuwa_img image='test.png' name='テスト' move='sway' />);
    const img = screen.getByAltText('テスト');
    expect(img).toHaveClass('animate-sway');
  });

  it('move="gentle"でanimate-gentle-floatクラスが適用される', () => {
    render(<Huwahuwa_img image='test.png' name='テスト' move='gentle' />);
    const img = screen.getByAltText('テスト');
    expect(img).toHaveClass('animate-gentle-float');
  });

  it('move="float"でanimate-floatクラスが適用される', () => {
    render(<Huwahuwa_img image='test.png' name='テスト' move='float' />);
    const img = screen.getByAltText('テスト');
    expect(img).toHaveClass('animate-float');
  });

  it('吹き出しが表示される', () => {
    const speechText = 'こんにちは！';
    render(<Huwahuwa_img image='test.png' name='テスト' speech={speechText} />);
    expect(screen.getByText(speechText)).toBeInTheDocument();
  });

  it('吹き出しがない場合は表示されない', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' />
    );
    const speechBubble = container.querySelector('.bg-white.rounded-2xl');
    expect(speechBubble).not.toBeInTheDocument();
  });

  it('吹き出しの幅が正しく適用される', () => {
    const { container } = render(
      <Huwahuwa_img
        image='test.png'
        name='テスト'
        speech='メッセージ'
        speechWidth='300px'
      />
    );
    const speechBubble = container.querySelector(
      '.bg-white.rounded-2xl'
    ) as HTMLElement;
    expect(speechBubble?.style.width).toBe('300px');
  });

  it('吹き出しの三角形が表示される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' speech='テスト' />
    );
    const triangle = container.querySelector('.rotate-45');
    expect(triangle).toBeInTheDocument();
  });

  it('ラッパーにabsoluteクラスが適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('absolute');
  });

  it('ラッパーにz-40クラスが適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('z-40');
  });

  it('複数の位置指定が同時に適用される', () => {
    const { container } = render(
      <Huwahuwa_img
        image='test.png'
        name='テスト'
        top='10px'
        left='20px'
        right='30px'
        bottom='40px'
      />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.top).toBe('10px');
    expect(wrapper.style.left).toBe('20px');
    expect(wrapper.style.right).toBe('30px');
    expect(wrapper.style.bottom).toBe('40px');
  });

  it('パーセンテージでの位置指定が可能', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' top='50%' left='25%' />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.top).toBe('50%');
    expect(wrapper.style.left).toBe('25%');
  });

  it('異なる画像パスが正しく設定される', () => {
    render(<Huwahuwa_img image='custom/path.jpg' name='カスタム画像' />);
    const img = screen.getByAltText('カスタム画像');
    expect(img).toHaveAttribute('src', '/assets/images/custom/path.jpg');
  });

  it('React要素を吹き出しとして受け取れる', () => {
    const speechElement = <strong>強調テキスト</strong>;
    render(
      <Huwahuwa_img image='test.png' name='テスト' speech={speechElement} />
    );
    expect(screen.getByText('強調テキスト')).toBeInTheDocument();
  });

  it('空文字列の吹き出しでも表示される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' speech='' />
    );
    const speechBubble = container.querySelector('.bg-white.rounded-2xl');
    expect(speechBubble).not.toBeInTheDocument();
  });

  it('長い吹き出しテキストが正しく表示される', () => {
    const longText = 'これは非常に長いテキストです。'.repeat(5);
    render(<Huwahuwa_img image='test.png' name='テスト' speech={longText} />);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('吹き出しに正しいスタイルクラスが適用される', () => {
    const { container } = render(
      <Huwahuwa_img image='test.png' name='テスト' speech='テスト' />
    );
    const speechBubble = container.querySelector('.bg-white.rounded-2xl');
    expect(speechBubble).toHaveClass('shadow-lg');
    expect(speechBubble).toHaveClass('border');
    expect(speechBubble).toHaveClass('border-gray-300');
  });

  it('画像のファイル名に特殊文字が含まれても動作する', () => {
    render(<Huwahuwa_img image='test-image_123.png' name='特殊文字画像' />);
    const img = screen.getByAltText('特殊文字画像');
    expect(img).toHaveAttribute('src', '/assets/images/test-image_123.png');
  });
});
