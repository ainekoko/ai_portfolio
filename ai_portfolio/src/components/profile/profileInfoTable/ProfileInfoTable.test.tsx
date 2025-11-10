import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileInfoTable from './ProfileInfoTable';
import { PROFILE_DATA } from '../../../utils/profileData';

// モックデータを直接定義

describe('ProfileInfoTable', () => {
  afterEach(() => {});
  beforeEach(() => {});

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<ProfileInfoTable profileData={PROFILE_DATA} />);

      // spanタグをすべて取得
      const spanElements = screen
        .getAllByRole('generic', { hidden: true })
        .filter((el) => el.tagName === 'SPAN');

      // spanのテキストを確認
      expect(spanElements[0]).toHaveTextContent('出身');
      expect(spanElements[1]).toHaveTextContent('学歴');
      expect(spanElements[2]).toHaveTextContent('自己紹介');
      expect(spanElements[3]).toHaveTextContent('1988');
      expect(spanElements[4]).toHaveTextContent('2');
      expect(spanElements[5]).toHaveTextContent('趣味');
      expect(spanElements[6]).toHaveTextContent('尊敬する人');
    });
  });
  describe('異常系', () => {});
});
