import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedWaveBackground from './AnimatedWaveBackground';

describe('AnimatedWaveBackground', () => {
  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      const { container } = render(<AnimatedWaveBackground />);

      // メインコンテナの確認
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toBeInTheDocument();
      expect(mainDiv).toHaveClass(
        'bg-white',
        'relative',
        'w-full',
        'h-[200px]',
        'overflow-hidden'
      );
    });

    it('2つのSVG要素が存在する', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(2);
    });

    it('各SVGに正しい属性が設定されている', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const svgs = container.querySelectorAll('svg');

      // 1層目のSVG
      expect(svgs[0]).toHaveAttribute('viewBox', '0 0 1200 250');
      expect(svgs[0]).toHaveAttribute('preserveAspectRatio', 'none');
      expect(svgs[0]).toHaveClass('absolute', 'bottom-0', 'w-full', 'h-64');

      // 2層目のSVG
      expect(svgs[1]).toHaveAttribute('viewBox', '0 0 1200 180');
      expect(svgs[1]).toHaveAttribute('preserveAspectRatio', 'none');
      expect(svgs[1]).toHaveClass('absolute', 'bottom-0', 'w-full', 'h-48');
    });

    it('各SVGにpath要素が存在する', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const paths = container.querySelectorAll('path');
      expect(paths).toHaveLength(2);
    });

    it('1層目の波に正しいスタイルが適用されている', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const firstPath = container.querySelector('svg path');
      expect(firstPath).toHaveAttribute('fill', '#7DFFE1');
    });

    it('2層目の波に正しいスタイルが適用されている', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const paths = container.querySelectorAll('path');
      const secondPath = paths[1];

      expect(secondPath).toHaveAttribute('fill', '#ffffff');
    });

    it('各pathにanimate要素が存在する', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const animateElements = container.querySelectorAll('animate');
      expect(animateElements).toHaveLength(2);
    });

    it('アニメーション設定が正しい', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const animateElements = container.querySelectorAll('animate');

      // 1層目のアニメーション
      expect(animateElements[0]).toHaveAttribute('attributeName', 'd');
      expect(animateElements[0]).toHaveAttribute('dur', '7s');
      expect(animateElements[0]).toHaveAttribute('repeatCount', 'indefinite');

      // 2層目のアニメーション
      expect(animateElements[1]).toHaveAttribute('attributeName', 'd');
      expect(animateElements[1]).toHaveAttribute('dur', '5s');
      expect(animateElements[1]).toHaveAttribute('repeatCount', 'indefinite');
    });

    it('アニメーションのvalues属性が設定されている', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const animateElements = container.querySelectorAll('animate');

      animateElements.forEach((animate) => {
        const values = animate.getAttribute('values');
        expect(values).toBeTruthy();
        expect(values).toContain('M0,');
        expect(values).toContain('L1200,');
      });
    });

    it('2つのラッパーdivが存在する', () => {
      const { container } = render(<AnimatedWaveBackground />);

      const wrapperDivs = container.querySelectorAll('.absolute.inset-0');
      expect(wrapperDivs).toHaveLength(2);
    });
  });

  describe('スナップショットテスト', () => {
    it('コンポーネントの構造が変わっていない', () => {
      const { container } = render(<AnimatedWaveBackground />);
      expect(container).toMatchSnapshot();
    });
  });
});
