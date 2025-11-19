import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedWaveBackground from './AnimatedWaveBackground ';
import { QAITEMS } from '../../../utils/messageData';

// モックデータを直接定義

describe('QAItem', () => {
  afterEach(() => {});
  beforeEach(() => {});

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<AnimatedWaveBackground />);

      const waveElements = screen.getAllByTestId('wave-element');
      expect(waveElements.length).toBeGreaterThan(0);
    });
  });
  describe('異常系', () => {});
});
