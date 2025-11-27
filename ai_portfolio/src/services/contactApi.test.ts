import { postContactEmailApi } from './contactApi';
import { ContactFormValues } from '../validations/contracts';

// グローバルfetchをモック
global.fetch = jest.fn();

describe('postContactEmailApi', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks();
  });

  it('正常にメールを送信できる', async () => {
    const mockData: ContactFormValues = {
      name: 'テスト太郎',
      email: 'test@example.com',
      message: 'テストメッセージ',
    };

    const mockResponse = {
      success: true,
      message: 'メールが送信されました',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await postContactEmailApi(mockData);

    expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    });

    expect(result).toEqual(mockResponse);
  });

  it('送信に失敗した場合エラーをスローする', async () => {
    const mockData: ContactFormValues = {
      name: 'テスト太郎',
      email: 'test@example.com',
      message: 'テストメッセージ',
    };

    const mockErrorResponse = {
      error: 'メール送信エラー',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    await expect(postContactEmailApi(mockData)).rejects.toThrow(
      'メール送信エラー'
    );
  });

  it('エラーメッセージがない場合デフォルトメッセージをスローする', async () => {
    const mockData: ContactFormValues = {
      name: 'テスト太郎',
      email: 'test@example.com',
      message: 'テストメッセージ',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    await expect(postContactEmailApi(mockData)).rejects.toThrow(
      'メールの送信に失敗しました'
    );
  });

  it('ネットワークエラーが発生した場合', async () => {
    const mockData: ContactFormValues = {
      name: 'テスト太郎',
      email: 'test@example.com',
      message: 'テストメッセージ',
    };

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    await expect(postContactEmailApi(mockData)).rejects.toThrow(
      'Network error'
    );
  });

  it('JSONパースエラーが発生した場合', async () => {
    const mockData: ContactFormValues = {
      name: 'テスト太郎',
      email: 'test@example.com',
      message: 'テストメッセージ',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('JSON parse error');
      },
    });

    await expect(postContactEmailApi(mockData)).rejects.toThrow(
      'JSON parse error'
    );
  });
});
