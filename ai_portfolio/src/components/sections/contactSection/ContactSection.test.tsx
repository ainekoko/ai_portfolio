import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactSection from './ContactSection';

describe('ContactSection', () => {
  describe('正常系', () => {
    beforeEach(() => {});
    afterEach(() => {});
    it('コンポーネントが正しくレンダリングされる', () => {
      const mockIsVisible = jest.fn((sectionId: string) => true);
      render(<ContactSection isVisible={mockIsVisible} />);
      // section要素が存在するか
      const section = screen.getByRole('heading', {
        name: 'C o n t a c t / ご質問がありましたらお気軽にご連絡ください',
      });
      expect(section).toBeInTheDocument();
    });
  });
  describe('異常系', () => {});
});
