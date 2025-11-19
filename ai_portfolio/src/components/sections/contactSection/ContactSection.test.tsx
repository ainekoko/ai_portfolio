import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ContactSection from './ContactSection';
import { postContactEmailApi } from '../../../services/contactApi';
import { act } from 'react';
// APIモック
jest.mock('@/services/contactApi');
const mockPostContactEmailApi = postContactEmailApi as jest.MockedFunction<
  typeof postContactEmailApi
>;

describe('ContactSection', () => {
  const mockIsVisible = jest.fn((sectionId: string) => true);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    describe('レンダリング', () => {
      it('コンポーネントが正しくレンダリングされる', () => {
        render(<ContactSection isVisible={mockIsVisible} />);

        // セクション見出しの確認
        const heading = screen.getByRole('heading', {
          name: 'C o n t a c t / ご質問がありましたらお気軽にご連絡ください',
        });
        expect(heading).toBeInTheDocument();

        // フォーム要素の確認
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mail address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: /送信/i })
        ).toBeInTheDocument();
      });

      it('全てのフォームフィールドに必須マークが表示される', () => {
        render(<ContactSection isVisible={mockIsVisible} />);

        const requiredMarks = screen.getAllByText('*');
        expect(requiredMarks).toHaveLength(3); // name, email, message
      });
    });

    describe('フォーム送信', () => {
      it('正しい入力で送信が成功する', async () => {
        const user = userEvent.setup();
        mockPostContactEmailApi.mockResolvedValueOnce({
          success: true,
          message: 'メールが送信されました',
        });

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );

        // 送信ボタンクリック
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // API呼び出しの確認
        await waitFor(() => {
          expect(mockPostContactEmailApi).toHaveBeenCalledWith({
            name: '山田太郎',
            email: 'test@example.com',
            message: 'お問い合わせ内容です',
          });
        });

        // 成功メッセージの確認
        await waitFor(() => {
          expect(screen.getByText('送信が完了しました!')).toBeInTheDocument();
        });
      });

      it('送信成功後にフォームがリセットされる', async () => {
        const user = userEvent.setup();
        mockPostContactEmailApi.mockResolvedValueOnce({
          success: true,
          message: 'メールが送信されました',
        });

        render(<ContactSection isVisible={mockIsVisible} />);

        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(
          /mail address/i
        ) as HTMLInputElement;
        const messageInput = screen.getByLabelText(
          /comment/i
        ) as HTMLTextAreaElement;

        // フォーム入力
        await user.type(nameInput, '山田太郎');
        await user.type(emailInput, 'test@example.com');
        await user.type(messageInput, 'お問い合わせ内容です');

        // 送信
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // フォームがリセットされることを確認
        await waitFor(() => {
          expect(nameInput.value).toBe('');
          expect(emailInput.value).toBe('');
          expect(messageInput.value).toBe('');
        });
      });

      it('送信成功メッセージが3秒後に消える', async () => {
        const user = userEvent.setup();

        mockPostContactEmailApi.mockResolvedValueOnce({
          success: true,
          message: 'メールが送信されました',
        });

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力と送信
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // 成功メッセージが表示される
        await waitFor(() => {
          expect(screen.getByText('送信が完了しました!')).toBeInTheDocument();
        });

        // 3秒待機
        await waitFor(
          () => {
            expect(
              screen.queryByText('送信が完了しました!')
            ).not.toBeInTheDocument();
          },
          { timeout: 4000 }
        );
      }, 10000);

      it('送信中はボタンが無効化され、テキストが変わる', async () => {
        const user = userEvent.setup();
        let resolveSubmit!: (value: {
          success: boolean;
          message: string;
        }) => void;
        const submitPromise = new Promise<{
          success: boolean;
          message: string;
        }>((resolve) => {
          resolveSubmit = resolve;
        });
        mockPostContactEmailApi.mockReturnValue(submitPromise);

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );

        // 送信ボタンクリック
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // 送信中の状態を確認
        await waitFor(() => {
          const button = screen.getByRole('button', { name: /送信中/i });
          expect(button).toBeDisabled();
          expect(button).toHaveAttribute('aria-busy', 'true');
        });

        // 送信完了
        resolveSubmit({ success: true, message: 'メールが送信されました' });

        // ボタンが有効化される
        await waitFor(() => {
          expect(screen.getByRole('button', { name: /送信/i })).toBeEnabled();
        });
      });
    });

    describe('入力フィールド', () => {
      it('各フィールドに入力できる', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(
          /mail address/i
        ) as HTMLInputElement;
        const messageInput = screen.getByLabelText(
          /comment/i
        ) as HTMLTextAreaElement;

        await user.type(nameInput, 'テスト太郎');
        await user.type(emailInput, 'test@example.com');
        await user.type(messageInput, 'これはテストメッセージです');

        expect(nameInput.value).toBe('テスト太郎');
        expect(emailInput.value).toBe('test@example.com');
        expect(messageInput.value).toBe('これはテストメッセージです');
      });

      it('送信中は全てのフィールドが無効化される', async () => {
        const user = userEvent.setup();
        let resolveSubmit!: (value: {
          success: boolean;
          message: string;
        }) => void;
        const submitPromise = new Promise<{
          success: boolean;
          message: string;
        }>((resolve) => {
          resolveSubmit = resolve;
        });
        mockPostContactEmailApi.mockReturnValue(submitPromise);

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );

        // 送信開始
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // フィールドが無効化されることを確認
        await waitFor(() => {
          expect(screen.getByLabelText(/name/i)).toBeDisabled();
          expect(screen.getByLabelText(/mail address/i)).toBeDisabled();
          expect(screen.getByLabelText(/comment/i)).toBeDisabled();
        });

        // 送信完了
        resolveSubmit({ success: true, message: 'メールが送信されました' });

        // フィールドが有効化される
        await waitFor(() => {
          expect(screen.getByLabelText(/name/i)).toBeEnabled();
        });
      });
    });
  });

  describe('異常系', () => {
    describe('バリデーションエラー', () => {
      it('名前が未入力の場合、エラーメッセージが表示される', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        const nameInput = screen.getByLabelText(/name/i);

        // フォーカスして離れる（onBlurトリガー）
        await user.click(nameInput);
        await user.tab();

        // エラーメッセージの確認
        await waitFor(() => {
          expect(screen.getByText('名前は入力必須です')).toBeInTheDocument();
        });
      });

      it('メールアドレスの形式が不正な場合、エラーメッセージが表示される', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        const emailInput = screen.getByLabelText(/mail address/i);

        await user.type(emailInput, 'invalid-email');
        await user.tab();

        await waitFor(() => {
          expect(
            screen.getByText('正しいメールアドレスを入力してください')
          ).toBeInTheDocument();
        });
      });

      it('コメントが5文字未満の場合、エラーメッセージが表示される', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        const messageInput = screen.getByLabelText(/comment/i);

        await user.type(messageInput, 'あいう');
        await user.tab();

        await waitFor(() => {
          expect(
            screen.getByText('問い合わせ内容は5文字以上必要です')
          ).toBeInTheDocument();
        });
      });

      it('複数のバリデーションエラーが同時に表示される', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        // 全てのフィールドをフォーカスして離れる
        await user.click(screen.getByLabelText(/name/i));
        await user.tab();
        await user.type(screen.getByLabelText(/mail address/i), 'invalid');
        await user.tab();
        await user.type(screen.getByLabelText(/comment/i), 'あ');
        await user.tab();

        // 複数のエラーメッセージが表示される
        await waitFor(() => {
          expect(screen.getByText('名前は入力必須です')).toBeInTheDocument();
          expect(
            screen.getByText('正しいメールアドレスを入力してください')
          ).toBeInTheDocument();
          expect(
            screen.getByText('問い合わせ内容は5文字以上必要です')
          ).toBeInTheDocument();
        });
      });

      it('バリデーションエラーがある場合、送信できない', async () => {
        const user = userEvent.setup();
        render(<ContactSection isVisible={mockIsVisible} />);

        // 無効なメールアドレスのみ入力
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'invalid-email'
        );
        await user.type(screen.getByLabelText(/comment/i), 'メッセージ');

        // 送信ボタンクリック
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // APIが呼ばれないことを確認
        expect(mockPostContactEmailApi).not.toHaveBeenCalled();
      });
    });

    describe('送信エラー', () => {
      it('API送信エラー時にエラーメッセージが表示される', async () => {
        const user = userEvent.setup();
        mockPostContactEmailApi.mockRejectedValueOnce(
          new Error('メールの送信に失敗しました')
        );

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );

        // 送信
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // エラーメッセージの確認
        await waitFor(() => {
          expect(
            screen.getByText('メールの送信に失敗しました')
          ).toBeInTheDocument();
        });
      });

      it('カスタムエラーメッセージが表示される', async () => {
        const user = userEvent.setup();
        mockPostContactEmailApi.mockRejectedValueOnce(
          new Error('サーバーエラーが発生しました')
        );

        render(<ContactSection isVisible={mockIsVisible} />);

        // フォーム入力と送信
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // カスタムエラーメッセージの確認
        await waitFor(() => {
          expect(
            screen.getByText('サーバーエラーが発生しました')
          ).toBeInTheDocument();
        });
      });

      it('送信エラー後、フォームはリセットされない', async () => {
        const user = userEvent.setup();
        mockPostContactEmailApi.mockRejectedValueOnce(new Error('送信失敗'));

        render(<ContactSection isVisible={mockIsVisible} />);

        const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
        const emailInput = screen.getByLabelText(
          /mail address/i
        ) as HTMLInputElement;
        const messageInput = screen.getByLabelText(
          /comment/i
        ) as HTMLTextAreaElement;

        // フォーム入力
        await user.type(nameInput, '山田太郎');
        await user.type(emailInput, 'test@example.com');
        await user.type(messageInput, 'お問い合わせ内容です');

        // 送信
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // エラー後も値が保持されている
        await waitFor(() => {
          expect(nameInput.value).toBe('山田太郎');
          expect(emailInput.value).toBe('test@example.com');
          expect(messageInput.value).toBe('お問い合わせ内容です');
        });
      });

      it('送信エラー後、再度送信できる', async () => {
        const user = userEvent.setup();

        // 最初は失敗、2回目は成功
        mockPostContactEmailApi
          .mockRejectedValueOnce(new Error('送信失敗'))
          .mockResolvedValueOnce({
            success: true,
            message: 'メールが送信されました',
          });

        render(<ContactSection isVisible={mockIsVisible} />);

        // 1回目の送信（失敗）
        await user.type(screen.getByLabelText(/name/i), '山田太郎');
        await user.type(
          screen.getByLabelText(/mail address/i),
          'test@example.com'
        );
        await user.type(
          screen.getByLabelText(/comment/i),
          'お問い合わせ内容です'
        );
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // エラー確認
        await waitFor(() => {
          expect(screen.getByText('送信失敗')).toBeInTheDocument();
        });

        // 2回目の送信（成功）
        await user.click(screen.getByRole('button', { name: /送信/i }));

        // 成功メッセージ確認
        await waitFor(() => {
          expect(screen.getByText('送信が完了しました!')).toBeInTheDocument();
        });
      });
    });
  });

  describe('アクセシビリティ', () => {
    it('フォームに適切なaria-labelが設定されている', () => {
      render(<ContactSection isVisible={mockIsVisible} />);

      const form = screen.getByRole('form', {
        name: /お問い合わせフォーム/i,
      });
      expect(form).toBeInTheDocument();
    });

    it('必須フィールドにaria-requiredが設定されている', () => {
      render(<ContactSection isVisible={mockIsVisible} />);

      expect(screen.getByLabelText(/name/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/mail address/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(screen.getByLabelText(/comment/i)).toHaveAttribute(
        'aria-required',
        'true'
      );
    });

    it('エラー時にaria-invalidとaria-describedbyが設定される', async () => {
      const user = userEvent.setup();
      render(<ContactSection isVisible={mockIsVisible} />);

      const nameInput = screen.getByLabelText(/name/i);

      // エラーをトリガー
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute('aria-describedby');
      });
    });

    it('送信中のボタンにaria-busyが設定される', async () => {
      const user = userEvent.setup();
      let resolveSubmit!: (value: {
        success: boolean;
        message: string;
      }) => void;
      const submitPromise = new Promise<{
        success: boolean;
        message: string;
      }>((resolve) => {
        resolveSubmit = resolve;
      });
      mockPostContactEmailApi.mockReturnValue(submitPromise);

      render(<ContactSection isVisible={mockIsVisible} />);

      await user.type(screen.getByLabelText(/name/i), '山田太郎');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'お問い合わせ内容です'
      );
      await user.click(screen.getByRole('button', { name: /送信/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /送信中/i })).toHaveAttribute(
          'aria-busy',
          'true'
        );
      });

      resolveSubmit({ success: true, message: 'メールが送信されました' });
    });
    it('エラーメッセージにrole="alert"が設定されている', async () => {
      const user = userEvent.setup();
      mockPostContactEmailApi.mockRejectedValueOnce(new Error('送信エラー'));

      render(<ContactSection isVisible={mockIsVisible} />);

      await user.type(screen.getByLabelText(/name/i), '山田太郎');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'お問い合わせ内容です'
      );
      await user.click(screen.getByRole('button', { name: /送信/i }));

      await waitFor(() => {
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveAttribute('aria-live', 'assertive');
      });
    });

    it('成功メッセージにaria-live="polite"が設定されている', async () => {
      const user = userEvent.setup();
      mockPostContactEmailApi.mockResolvedValueOnce({
        success: true,
        message: 'メールが送信されました',
      });

      render(<ContactSection isVisible={mockIsVisible} />);

      await user.type(screen.getByLabelText(/name/i), '山田太郎');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'お問い合わせ内容です'
      );
      await user.click(screen.getByRole('button', { name: /送信/i }));

      await waitFor(() => {
        const status = screen.getByRole('status');
        expect(status).toHaveAttribute('aria-live', 'polite');
      });
    });
  });

  describe('入力ケース', () => {
    it('名前が50文字を超える場合、エラーが表示される', async () => {
      const user = userEvent.setup();
      render(<ContactSection isVisible={mockIsVisible} />);

      const longName = 'あ'.repeat(51);
      await user.type(screen.getByLabelText(/name/i), longName);
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText('名前は50文字以内で入力してください')
        ).toBeInTheDocument();
      });
    });

    it('メッセージが正確に5文字の場合、バリデーションが通る', async () => {
      const user = userEvent.setup();
      render(<ContactSection isVisible={mockIsVisible} />);

      await user.type(screen.getByLabelText(/comment/i), 'あいうえお');
      await user.tab();

      // エラーメッセージが表示されないことを確認
      expect(
        screen.queryByText('問い合わせ内容は5文字以上必要です')
      ).not.toBeInTheDocument();
    });

    it('特殊文字を含む入力が正しく処理される', async () => {
      const user = userEvent.setup();
      mockPostContactEmailApi.mockResolvedValueOnce({
        success: true,
        message: 'メールが送信されました',
      });

      render(<ContactSection isVisible={mockIsVisible} />);

      await user.type(screen.getByLabelText(/name/i), '山田<太郎>');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test+tag@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'テスト & 特殊文字 < > " \''
      );

      await user.click(screen.getByRole('button', { name: /送信/i }));

      await waitFor(() => {
        expect(mockPostContactEmailApi).toHaveBeenCalledWith({
          name: '山田<太郎>',
          email: 'test+tag@example.com',
          message: 'テスト & 特殊文字 < > " \'',
        });
      });
    });

    it('空白のみの入力はバリデーションエラーになる', async () => {
      const user = userEvent.setup();
      render(<ContactSection isVisible={mockIsVisible} />);

      // 空白のみを入力
      await user.type(screen.getByLabelText(/name/i), '   ');
      await user.tab();
    });
  });

  describe('統合テスト', () => {
    it('完全な送信フローが正常に動作する', async () => {
      const user = userEvent.setup();

      // Promiseを使って送信を制御
      let resolveSubmit!: (value: {
        success: boolean;
        message: string;
      }) => void;
      const submitPromise = new Promise<{
        success: boolean;
        message: string;
      }>((resolve) => {
        resolveSubmit = resolve;
      });
      mockPostContactEmailApi.mockReturnValue(submitPromise);

      render(<ContactSection isVisible={mockIsVisible} />);

      // 1. フォーム入力
      await user.type(screen.getByLabelText(/name/i), '山田太郎');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'お問い合わせ内容です'
      );

      // 2. 送信
      await user.click(screen.getByRole('button', { name: /送信/i }));

      // 3. 送信中の確認
      await waitFor(() => {
        const button = screen.getByRole('button', { name: /送信中/i });
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
      });

      // 送信を完了させる
      resolveSubmit({ success: true, message: 'メールが送信されました' });

      // 4. 成功メッセージの確認
      await waitFor(() => {
        expect(screen.getByText('送信が完了しました!')).toBeInTheDocument();
      });

      // 5. フォームリセットの確認
      await waitFor(() => {
        expect((screen.getByLabelText(/name/i) as HTMLInputElement).value).toBe(
          ''
        );
        expect(
          (screen.getByLabelText(/mail address/i) as HTMLInputElement).value
        ).toBe('');
        expect(
          (screen.getByLabelText(/comment/i) as HTMLTextAreaElement).value
        ).toBe('');
      });

      // 6. ボタンが再度有効になる
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /送信/i })).toBeEnabled();
      });
    });
    it('エラーから回復して成功するフローが動作する', async () => {
      const user = userEvent.setup();

      // 最初は失敗、修正後は成功
      mockPostContactEmailApi
        .mockRejectedValueOnce(new Error('送信失敗'))
        .mockResolvedValueOnce({
          success: true,
          message: 'メールが送信されました',
        });

      render(<ContactSection isVisible={mockIsVisible} />);

      // 1. 不正なメールで送信
      await user.type(screen.getByLabelText(/name/i), '山田太郎');
      await user.type(
        screen.getByLabelText(/mail address/i),
        'test@example.com'
      );
      await user.type(
        screen.getByLabelText(/comment/i),
        'お問い合わせ内容です'
      );
      await user.click(screen.getByRole('button', { name: /送信/i }));

      // 2. エラー確認
      await waitFor(() => {
        expect(screen.getByText('送信失敗')).toBeInTheDocument();
      });

      // 3. 再送信
      await user.click(screen.getByRole('button', { name: /送信/i }));

      // 4. 成功確認
      await waitFor(() => {
        expect(screen.getByText('送信が完了しました!')).toBeInTheDocument();
      });
    });
  });
});
