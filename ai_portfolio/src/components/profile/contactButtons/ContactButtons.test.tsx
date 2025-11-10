import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactButtons from './ContactButtons';
import { CONTACT_BUTTONS } from '../../../utils/profileData';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Contact } from '../../../types/profile';
const mockContacts: Contact[] = [
  {
    icon: {} as IconDefinition,
    text: 'Email',
    fullText: 'ai.ebata.contact@gmail.com',
    color: 'rose-300' as const,
    href: 'mailto:ai.ebata.contact@gmail.com',
  },
  {
    icon: {} as IconDefinition,
    text: 'GitHub',
    fullText: 'https://github.com/ainekoko/ai_portfolio',
    color: 'purple-400' as const,
    href: 'https://github.com/ainekoko/ai_portfolio',
  },
  {
    icon: {} as IconDefinition,
    text: 'X (Twitter)',
    fullText: '@your_twitter',
    color: 'indigo-500' as const,
    href: 'https://twitter.com/your_twitter',
  },
];

// FontAwesomeIconをモック
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ className }: { className: string }) => (
    <span className={className} data-testid='icon' />
  ),
}));

describe('ContactButtons', () => {
  const mockOnClick = jest.fn();
  let mockWindowOpen: jest.SpyInstance;
  afterEach(() => {
    mockOnClick.mockClear();
    mockWindowOpen.mockRestore();
  });
  beforeEach(() => {
    mockWindowOpen = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  describe('正常系', () => {
    it('コンポーネントが正しくレンダリングされる', () => {
      render(<ContactButtons contacts={CONTACT_BUTTONS} />);

      // buttonロールで取得
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(CONTACT_BUTTONS.length);
    });

    it('Emailボタンをクリックするとmailtoが開く', async () => {
      render(<ContactButtons contacts={CONTACT_BUTTONS} />);

      const emailButton = screen.getByRole('button', {
        name: 'Email',
      });
      await waitFor(() => fireEvent.click(emailButton));

      expect(window.open).toHaveBeenCalledWith(
        'mailto:ai.ebata.contact@gmail.com',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('GitHubボタンをクリックするとGitHubが開く', async () => {
      render(<ContactButtons contacts={CONTACT_BUTTONS} />);

      const gitHubButton = screen.getByRole('button', {
        name: 'GitHub',
      });
      await waitFor(() => fireEvent.click(gitHubButton));

      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/ainekoko/ai_portfolio',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('XボタンをクリックするとXが開く', async () => {
      render(<ContactButtons contacts={CONTACT_BUTTONS} />);

      const gitHubButton = screen.getByRole('button', {
        name: 'X (Twitter)',
      });
      await waitFor(() => fireEvent.click(gitHubButton));

      expect(window.open).toHaveBeenCalledWith(
        'https://twitter.com/your_twitter',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('Enterキーでリンクが開く', () => {
      render(<ContactButtons contacts={mockContacts} />);

      const emailButton = screen.getByRole('button', { name: 'Email' });
      fireEvent.keyDown(emailButton, { key: 'Enter' });

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'mailto:ai.ebata.contact@gmail.com',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('Spaceキーでリンクが開く', () => {
      render(<ContactButtons contacts={mockContacts} />);

      const emailButton = screen.getByRole('button', { name: 'Email' });
      fireEvent.keyDown(emailButton, { key: ' ' });

      expect(mockWindowOpen).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).toHaveBeenCalledWith(
        'mailto:ai.ebata.contact@gmail.com',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('その他のキーでは何も起こらない', () => {
      render(<ContactButtons contacts={mockContacts} />);

      const emailButton = screen.getByRole('button', { name: 'Email' });
      fireEvent.keyDown(emailButton, { key: 'a' });

      expect(mockWindowOpen).not.toHaveBeenCalled();
    });
    it('hrefがある場合、ボタンがクリック可能', () => {
      const mockOpen = jest.fn();
      window.open = mockOpen;

      render(<ContactButtons contacts={CONTACT_BUTTONS} />);

      const emailButton = screen.getByRole('button', {
        name: 'Email',
      });

      fireEvent.click(emailButton);

      expect(mockOpen).toHaveBeenCalledWith(
        'mailto:ai.ebata.contact@gmail.com',
        '_blank',
        'noopener,noreferrer'
      );
    });
    it('hrefが空文字のボタンをクリックしてもwindow.openが呼ばれない', () => {
      const contactsWithEmptyHref = [
        {
          icon: CONTACT_BUTTONS[0].icon,
          text: 'Empty Href',
          color: 'rose-300' as const,
          href: '',
        },
      ];

      render(<ContactButtons contacts={contactsWithEmptyHref} />);

      const button = screen.getByRole('button', { name: 'Empty Href' });
      fireEvent.click(button);

      expect(mockWindowOpen).not.toHaveBeenCalled();
    });
  });
  describe('異常系', () => {});
});
