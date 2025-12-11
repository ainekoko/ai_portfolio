import { NextResponse } from 'next/server';

/**
 * ログインAPI
 * POST /api/auth/login
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { error: 'メールアドレスとパスワードが必要です' },
        { status: 400 }
      );
    }

    // メールアドレス形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // パスワード長チェック
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'パスワードは6文字以上である必要があります' },
        { status: 400 }
      );
    }

    // TODO: 実際のデータベース認証処理
    // const user = await db.user.findUnique({ where: { email } });
    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // 仮の認証処理（デモ用）
    if (email === 'test@example.com' && password === 'password123') {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          email,
          name: 'テストユーザー',
        },
      });
    }

    // 認証失敗
    return NextResponse.json(
      { error: 'メールアドレスまたはパスワードが正しくありません' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
