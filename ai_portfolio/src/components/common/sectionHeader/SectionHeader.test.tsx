import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('コンポーネントが正しくレンダリングされる', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('タイトルが正しく表示される', () => {
    render(<SectionHeader isVisible={true} title='PROFILE' />);
    expect(screen.getByText('P')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
    expect(screen.getByText('I')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('サブタイトルが正しく表示される', () => {
    render(
      <SectionHeader isVisible={true} title='PROFILE' subtitle='プロフィール' />
    );
    expect(screen.getByText(/プロフィール/)).toBeInTheDocument();
  });

  it('サブタイトルがない場合でも正しくレンダリングされる', () => {
    render(<SectionHeader isVisible={true} title='PROFILE' />);
    const subtitle = screen.queryByText(/\//);
    expect(subtitle).not.toBeInTheDocument();
  });

  it('isVisible=trueの場合、opacity-0クラスが適用されない', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).not.toHaveClass('opacity-0');
  });

  it('isVisible=falseの場合、opacity-0クラスが適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={false} title='TEST' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).toHaveClass('opacity-0');
  });

  it('size="large"で正しいクラスが適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' size='large' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).toHaveClass('text-7xl');
    expect(h2).toHaveClass('md:text-9xl');
  });

  it('size="normal"で正しいクラスが適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' size='normal' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).toHaveClass('text-4xl');
    expect(h2).toHaveClass('md:text-6xl');
  });

  it('size="small"で正しいクラスが適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' size='small' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).toHaveClass('text-2xl');
    expect(h2).toHaveClass('md:text-4xl');
  });

  it('デフォルトのsizeが"large"である', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    const h2 = container.querySelector('h2');
    expect(h2).toHaveClass('text-7xl');
  });

  it('各文字がspan要素でラップされている', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='ABC' />
    );
    const spans = container.querySelectorAll('h2 > span');
    expect(spans.length).toBeGreaterThanOrEqual(3);
  });

  it('左側の二重線が表示される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    const leftLines = container.querySelectorAll('.w-8');
    expect(leftLines.length).toBeGreaterThan(0);
  });

  it('右側の二重線が表示される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    const rightLines = container.querySelectorAll('.flex-1');
    expect(rightLines.length).toBeGreaterThan(0);
  });

  it('isVisible=trueの場合、translate-x-0クラスが線に適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' />
    );
    const lines = container.querySelectorAll('.bg-gray-400');
    lines.forEach((line) => {
      expect(line).toHaveClass('translate-x-0');
      expect(line).toHaveClass('opacity-100');
    });
  });

  it('isVisible=falseの場合、translate-x-fullまたは-translate-x-fullクラスが線に適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={false} title='TEST' />
    );
    const lines = container.querySelectorAll('.bg-gray-400');
    expect(lines.length).toBeGreaterThan(0);
    lines.forEach((line) => {
      const hasTranslate =
        line.classList.contains('translate-x-full') ||
        line.classList.contains('-translate-x-full');
      expect(hasTranslate).toBe(true);
      expect(line).toHaveClass('opacity-0');
    });
  });

  it('文字にtransitionクラスが適用される', () => {
    const { container } = render(<SectionHeader isVisible={true} title='A' />);
    const letterSpan = container.querySelector('h2 > span');
    expect(letterSpan).toHaveClass('transition-all');
    expect(letterSpan).toHaveClass('duration-700');
  });

  it('文字にホバー時のクラスが適用される', () => {
    const { container } = render(<SectionHeader isVisible={true} title='A' />);
    const letterSpan = container.querySelector('h2 > span');
    expect(letterSpan).toHaveClass('hover:text-amber-950');
    expect(letterSpan).toHaveClass('hover:rotate-12');
    expect(letterSpan).toHaveClass('hover:scale-125');
  });

  it('日本語タイトルが正しく表示される', () => {
    render(<SectionHeader isVisible={true} title='プロフィール' />);
    expect(screen.getByText('プ')).toBeInTheDocument();
    expect(screen.getByText('ロ')).toBeInTheDocument();
    expect(screen.getByText('フ')).toBeInTheDocument();
    expect(screen.getByText('ィ')).toBeInTheDocument();
    expect(screen.getByText('ー')).toBeInTheDocument();
    expect(screen.getByText('ル')).toBeInTheDocument();
  });

  it('各文字にfontWeight=300が設定される', () => {
    const { container } = render(<SectionHeader isVisible={true} title='A' />);
    const letterSpan = container.querySelector('h2 > span') as HTMLElement;
    expect(letterSpan.style.fontWeight).toBe('300');
  });

  it('各文字にletterSpacing=0.05emが設定される', () => {
    const { container } = render(<SectionHeader isVisible={true} title='A' />);
    const letterSpan = container.querySelector('h2 > span') as HTMLElement;
    expect(letterSpan.style.letterSpacing).toBe('0.05em');
  });

  it('isVisible=trueの場合、文字にtextShadowが設定される', () => {
    const { container } = render(<SectionHeader isVisible={true} title='A' />);
    const letterSpan = container.querySelector('h2 > span') as HTMLElement;
    expect(letterSpan.style.textShadow).toBe('2px 2px 4px rgba(0,0,0,0.1)');
  });

  it('isVisible=falseの場合、文字のtextShadowがnoneになる', () => {
    const { container } = render(<SectionHeader isVisible={false} title='A' />);
    const letterSpan = container.querySelector('h2 > span') as HTMLElement;
    expect(letterSpan.style.textShadow).toBe('none');
  });

  it('サブタイトルに正しいクラスが適用される', () => {
    const { container } = render(
      <SectionHeader isVisible={true} title='TEST' subtitle='テスト' />
    );
    const subtitleSpan = container.querySelector('.italic');
    expect(subtitleSpan).toHaveClass('text-xs');
    expect(subtitleSpan).toHaveClass('md:text-sm');
    expect(subtitleSpan).toHaveClass('text-gray-500');
  });
});
