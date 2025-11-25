import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SesContents from './SesContents';
import { ITJOB_INTRODUCTION } from '../../utils/itData';

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
    expect(screen.getByText('System Engineer')).toBeInTheDocument();
    expect(screen.getByText('IT業界')).toBeInTheDocument();
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
        expect(screen.getByText(lang)).toBeInTheDocument();
      });
    }
  });

  it('キャラクター画像が表示される', () => {
    render(<SesContents />);

    const characterImages = screen.getAllByAltText('キャラクター');
    expect(characterImages.length).toBe(ITJOB_INTRODUCTION.length);
  });
});
