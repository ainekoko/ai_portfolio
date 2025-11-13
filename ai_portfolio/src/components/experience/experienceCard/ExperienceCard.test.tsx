import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceCard from './ExperienceCard';
import { PROFILE_DATA } from '../../../utils/profileData';

// モックデータを直接定義

describe('ExperienceCard', () => {
  afterEach(() => {});
  beforeEach(() => {});

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(
        <ExperienceCard
          key={0}
          title='化粧品メーカー'
          period='2011〜2017'
          description='約6年間様々な経験をさせて頂き接客から営業、企画まで幅広く対応し、コミュニケーションスキルや提案力、企画力を培いました。'
          link='/cosmetics'
        />
      );
      //タイトル確認
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      expect(h2Elements[0]).toHaveTextContent('化粧品メーカー');
    });
  });
  describe('異常系', () => {});
});
