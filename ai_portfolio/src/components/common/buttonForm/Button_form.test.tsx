import { render, screen } from '@testing-library/react';
import Button_form from './Button_form';

describe('Button_form', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button', { name: '送信' });
    expect(button).toBeInTheDocument();
  });

  it('propsで渡されたテキストが表示される', () => {
    const testText = 'お問い合わせ';
    render(<Button_form text={testText} />);
    const button = screen.getByRole('button', { name: testText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(testText);
  });

  it('buttonタグとしてレンダリングされる', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('正しいベースクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    // 主要なクラスが含まれていることを確認
    expect(button).toHaveClass('w-64');
    expect(button).toHaveClass('m-auto');
    expect(button).toHaveClass('bg-green-700/50');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('font-semibold');
    expect(button).toHaveClass('rounded-xl');
    expect(button).toHaveClass('backdrop-blur-md');
  });

  it('ホバー時のクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    // ホバー関連のクラスが含まれていることを確認
    expect(button).toHaveClass('hover:bg-green-700/20');
    expect(button).toHaveClass('hover:scale-95');
    expect(button).toHaveClass('hover:translate-y-1');
    expect(button).toHaveClass('hover:shadow-md');
  });

  it('トランジションクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('transition-all');
    expect(button).toHaveClass('duration-300');
    expect(button).toHaveClass('ease-out');
  });

  it('パディングクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('px-6');
  });

  it('ボーダーとシャドウのクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-white/30');
    expect(button).toHaveClass('shadow-lg');
  });

  it('トランスフォームクラスが適用される', () => {
    render(<Button_form text='送信' />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('transform');
  });

  it('空文字列のテキストでもレンダリングされる', () => {
    render(<Button_form text='' />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  it('長いテキストでも正しく表示される', () => {
    const longText = 'これは非常に長いボタンテキストの例です';
    render(<Button_form text={longText} />);
    const button = screen.getByRole('button', { name: longText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(longText);
  });

  it('特殊文字を含むテキストが正しく表示される', () => {
    const specialText = 'お問い合わせ <>&"\'';
    render(<Button_form text={specialText} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(specialText);
  });

  it('数字のみのテキストが正しく表示される', () => {
    const numberText = '12345';
    render(<Button_form text={numberText} />);
    const button = screen.getByRole('button', { name: numberText });
    expect(button).toBeInTheDocument();
  });

  it('改行を含むテキストが正しく表示される', () => {
    const multilineText = '送信 する';
    render(<Button_form text={multilineText} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(multilineText);
  });

  it('複数のButton_formが独立してレンダリングされる', () => {
    const { container } = render(
      <>
        <Button_form text='送信1' />
        <Button_form text='送信2' />
        <Button_form text='送信3' />
      </>
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveTextContent('送信1');
    expect(buttons[1]).toHaveTextContent('送信2');
    expect(buttons[2]).toHaveTextContent('送信3');
  });

  it('絵文字を含むテキストが正しく表示される', () => {
    const emojiText = '送信 📧';
    render(<Button_form text={emojiText} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(emojiText);
  });

  it('全角スペースを含むテキストが正しく表示される', () => {
    const spaceText = 'お問い 合わせ';
    render(<Button_form text={spaceText} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(spaceText);
  });
});
