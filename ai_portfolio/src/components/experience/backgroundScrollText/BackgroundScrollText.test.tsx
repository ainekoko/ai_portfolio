import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundScrollText from './BackgroundScrollText';

// モックデータを直接定義

describe('ExperienceCard', () => {
  afterEach(() => {});
  beforeEach(() => {});

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(
        <BackgroundScrollText
          text='Nailist'
          position='custom'
          customTop='450px'
        />
      );
      const elements = screen.getAllByText('Nailist Nailist Nailist Nailist');
      // ✅ 2つの要素が存在することを確認
      expect(elements).toHaveLength(2);
      // ✅ 各要素がDOMに存在することを確認
      elements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });
    it('position指定がない場合、top-0クラスが適用される', () => {
      const { container } = render(<BackgroundScrollText text='Test' />);

      const parentDiv = container.firstChild as HTMLElement;
      expect(parentDiv).toHaveClass('top-0');
      expect(parentDiv).not.toHaveClass('bottom-0');
    });
    it('positionがcustomの場合、customTopの値が適用される', () => {
      const { container } = render(
        <BackgroundScrollText text='Test' position='custom' customTop='450px' />
      );

      const parentDiv = container.firstChild as HTMLElement;
      expect(parentDiv).toHaveStyle({ top: '450px' });
    });
  });
  describe('異常系', () => {});
});
