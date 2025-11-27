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

    it('ホバー時にisHoveredがtrueになる', () => {
      render(<QAItem item={QAITEMS[0]} index={0} />);

      const qaItemDiv = screen.getByRole('button');

      // ホバー前は回答が非表示
      const contentDiv = screen.getByRole('region');
      expect(contentDiv).toHaveClass('max-h-0 opacity-0');

      // ホバー
      fireEvent.mouseEnter(qaItemDiv);

      // ホバー後は回答が表示
      waitFor(() => {
        expect(contentDiv).toHaveClass('max-h-96 opacity-100');
      });
    });

    it('マウスが離れた時にisHoveredがfalseになる', () => {
      render(<QAItem item={QAITEMS[0]} index={0} />);

      const qaItemDiv = screen.getByRole('button');
      const contentDiv = screen.getByRole('region');

      // ホバー
      fireEvent.mouseEnter(qaItemDiv);

      waitFor(() => {
        expect(contentDiv).toHaveClass('max-h-96 opacity-100');
      });

      // マウスを離す
      fireEvent.mouseLeave(qaItemDiv);

      waitFor(() => {
        expect(contentDiv).toHaveClass('max-h-0 opacity-0');
      });
    });

    it('aria属性が正しく設定されている', () => {
      render(<QAItem item={QAITEMS[0]} index={0} />);

      const button = screen.getByRole('button');
      const content = screen.getByRole('region');

      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', 'qa-content-0');
      expect(content).toHaveAttribute('aria-labelledby', 'qa-heading-0');
    });

    it('複数のアイテムで異なるIDが付与される', () => {
      const { rerender } = render(<QAItem item={QAITEMS[0]} index={0} />);
      const button1 = screen.getByRole('button');
      expect(button1).toHaveAttribute('id', 'qa-heading-0');

      rerender(<QAItem item={QAITEMS[1]} index={1} />);
      const button2 = screen.getByRole('button');
      expect(button2).toHaveAttribute('id', 'qa-heading-1');
    });
  });
  describe('異常系', () => {});
});
