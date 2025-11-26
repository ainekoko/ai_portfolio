import { render, screen } from '@testing-library/react';
import Font from './Font';

describe('Font', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    render(<Font>1988</Font>);
    expect(screen.getByText('1988')).toBeInTheDocument();
  });

  it('childrenが正しく表示される', () => {
    const testText = 'Hello World';
    render(<Font>{testText}</Font>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('spanタグとしてレンダリングされる', () => {
    const { container } = render(<Font>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });

  it('デフォルトでGeistフォントのクラスが適用される', () => {
    const { container } = render(<Font>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toHaveClass('font-[family-name:var(--font-geist-sans)]');
  });

  it('カスタムクラス名が追加で適用される', () => {
    const customClass = 'text-blue-500';
    const { container } = render(<Font className={customClass}>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toHaveClass(customClass);
    expect(span).toHaveClass('font-[family-name:var(--font-geist-sans)]');
  });

  it('複数のカスタムクラス名が適用される', () => {
    const customClasses = 'text-blue-500 font-bold text-xl';
    const { container } = render(<Font className={customClasses}>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toHaveClass('text-blue-500');
    expect(span).toHaveClass('font-bold');
    expect(span).toHaveClass('text-xl');
  });

  it('数字が正しく表示される', () => {
    render(<Font>123456</Font>);
    expect(screen.getByText('123456')).toBeInTheDocument();
  });

  it('英語テキストが正しく表示される', () => {
    const englishText = 'TypeScript';
    render(<Font>{englishText}</Font>);
    expect(screen.getByText(englishText)).toBeInTheDocument();
  });

  it('記号を含む数字が正しく表示される', () => {
    const formattedNumber = '1,234,567';
    render(<Font>{formattedNumber}</Font>);
    expect(screen.getByText(formattedNumber)).toBeInTheDocument();
  });

  it('バージョン番号が正しく表示される', () => {
    const version = 'v1.2.3';
    render(<Font>{version}</Font>);
    expect(screen.getByText(version)).toBeInTheDocument();
  });

  it('複数のFont要素が独立してレンダリングされる', () => {
    render(
      <div>
        <Font>First</Font>
        <Font>Second</Font>
        <Font>Third</Font>
      </div>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  it('数値型のchildrenが正しく表示される', () => {
    render(<Font>{2024}</Font>);
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('JSX要素をchildrenとして受け取れる', () => {
    render(
      <Font>
        <strong>Bold Text</strong>
      </Font>
    );
    expect(screen.getByText('Bold Text')).toBeInTheDocument();
  });

  it('複数の子要素を持つことができる', () => {
    render(
      <Font>
        <span>Part 1</span>
        <span>Part 2</span>
      </Font>
    );
    expect(screen.getByText('Part 1')).toBeInTheDocument();
    expect(screen.getByText('Part 2')).toBeInTheDocument();
  });

  it('特殊文字を含むテキストが正しく表示される', () => {
    const specialText = 'Hello & World <> 123';
    render(<Font>{specialText}</Font>);
    expect(screen.getByText('Hello & World <> 123')).toBeInTheDocument();
  });

  it('classNameがundefinedの場合、デフォルトクラスのみ適用される', () => {
    const { container } = render(<Font className={undefined}>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toHaveClass('font-[family-name:var(--font-geist-sans)]');
  });

  it('classNameが空文字列の場合、デフォルトクラスのみ適用される', () => {
    const { container } = render(<Font className=''>Test</Font>);
    const span = container.querySelector('span');
    expect(span).toHaveClass('font-[family-name:var(--font-geist-sans)]');
  });

  it('長いテキストが正しく表示される', () => {
    const longText =
      'This is a very long text to test the component with extended content';
    render(<Font>{longText}</Font>);
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('絵文字を含むテキストが正しく表示される', () => {
    const emojiText = 'Hello 👋 World 🌍';
    render(<Font>{emojiText}</Font>);
    expect(screen.getByText(emojiText)).toBeInTheDocument();
  });
});
