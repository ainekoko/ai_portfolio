import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceSection from './ExperienceSection';

describe('ExperienceSection', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      const mockIsVisible = jest.fn((sectionId: string) => true);
      render(<ExperienceSection isVisible={mockIsVisible} />);
      // section要素が存在するか
      const section = screen.getByRole('region', { name: '職務経歴' });
      expect(section).toBeInTheDocument();
    });
  });
  describe('異常系', () => {});
});
