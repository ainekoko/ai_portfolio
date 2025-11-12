import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QAItem from './QAItem';
import { QAITEMS } from '../../../utils/messageData';

// モックデータを直接定義

describe('QAItem', () => {
  afterEach(() => {});
  beforeEach(() => {});

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<QAItem item={QAITEMS[0]} index={0} />);

      // spanタグをすべて取得
      const spanElements = screen
        .getAllByRole('generic', { hidden: true })
        .filter((el) => el.tagName === 'SPAN');

      // spanのテキストを確認
      expect(spanElements[0]).toHaveTextContent('Q1.');
      expect(spanElements[1]).toHaveTextContent(
        '化粧品業界から何故エンジニアへの転職をしたのか？'
      );
      expect(spanElements[2]).toHaveTextContent('A.');
      const paragraph = screen.getByText(
        /自分が担当になった商品が＠コスメによって大ヒットし、売上が急増した事でネットでの宣伝の重要性を痛感しました。それから独学でHTML\/CSS\/JavaScriptを学び、プログラミングの楽しさに目覚め、もっと深く学びたいと思い、転職を決意しました。/i
      );
      expect(paragraph).toBeInTheDocument();
    });
  });
  describe('異常系', () => {});
});
