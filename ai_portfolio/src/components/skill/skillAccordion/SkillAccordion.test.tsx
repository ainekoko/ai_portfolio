import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillAccordion from './SkillAccordion';
import { SKILL_DATA } from '../../../utils/skillData';

describe('SkillAccordion', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<SkillAccordion id='another' skillData={SKILL_DATA.another} />);
      const text = screen.getByText('その他');
      expect(text).toBeInTheDocument();
    });
    it('アコーディオン開閉時にスキルデータが正しく表示される', async () => {
      render(<SkillAccordion id='another' skillData={SKILL_DATA.another} />);

      const content = screen.getByTestId('accordion-content');
      const btn = screen.getByTestId('accordion-click');

      expect(content).toHaveClass('max-h-0');
      expect(content).toHaveClass('opacity-0');

      //クリックしてアコーディオンを開く
      await waitFor(() => fireEvent.click(btn));

      expect(content).toHaveClass('opacity-100');

      //再度クリックしてアコーディオンを閉じる
      await waitFor(() => fireEvent.click(btn));
      expect(content).toHaveClass('max-h-0');
      expect(content).toHaveClass('opacity-0');
    });
  });
  describe('異常系', () => {});
});
