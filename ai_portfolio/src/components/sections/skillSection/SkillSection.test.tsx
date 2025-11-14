import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillSection from './SkillSection';

describe('SkillSection', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      const mockIsVisible = jest.fn((sectionId: string) => true);
      render(<SkillSection isVisible={mockIsVisible} />);
      // section要素が存在するか
      const section = screen.getByRole('region', { name: 'スキルセクション' });
      expect(section).toBeInTheDocument();
    });
  });
  describe('異常系', () => {});
});
