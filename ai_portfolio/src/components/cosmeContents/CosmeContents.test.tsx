import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CosmeContents from './CosmeContents';
import { COSME_CONTENTS } from '../../utils/CosmeContentsData';

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
    expect(screen.getByText('Cosmetics Company')).toBeInTheDocument();
    expect(screen.getByText('化粧品企業')).toBeInTheDocument();
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
    expect(screen.getByText('Cosmetics Company')).toBeInTheDocument();
  });

  it('レスポンシブ: モバイルサイズでカルーセルコントロールが非表示', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { container } = render(<CosmeContents />);

    const controls = container.querySelector('.embla__controls');
    expect(controls).toHaveClass('hidden');
  });
});
