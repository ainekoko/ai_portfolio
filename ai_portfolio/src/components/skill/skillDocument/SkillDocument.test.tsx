import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillDocument from './SkillDocument';
import { DOCUMENT_SKILL } from '../../../utils/skillData';

describe('SkillDocument', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<SkillDocument documentData={DOCUMENT_SKILL} />);
      const h2text = screen.getByRole('heading', { name: '設計書関連' });
      expect(h2text).toBeInTheDocument();
      const spanElements = screen
        .getAllByRole('generic', { hidden: true })
        .filter((el) => el.tagName === 'SPAN');

      // spanのテキストを確認
      expect(spanElements[0]).toHaveTextContent('-');
      expect(spanElements[1]).toHaveTextContent('要件概要書');
      expect(spanElements[2]).toHaveTextContent('QAの資料作成等');
    });
  });
  describe('異常系', () => {});
});
