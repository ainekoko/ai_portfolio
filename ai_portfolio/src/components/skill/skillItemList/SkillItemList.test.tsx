import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillItemList from './SkillItemList';
import { SKILL_DATA } from '../../../utils/skillData';

describe('SkillItemList', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(
        <SkillItemList id='1' title='another' skillData={SKILL_DATA.another} />
      );
      const pText = screen.getAllByRole('paragraph');
      expect(pText[0]).toHaveTextContent('another');
      expect(pText[1]).toHaveTextContent('Adobe XD');
      expect(pText[2]).toHaveTextContent('3 years');
    });
  });
  describe('異常系', () => {});
});
