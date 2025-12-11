import { NextResponse } from 'next/server';

/**
 * ログアウトAPI
 * POST /api/auth/logout
 */
export async function POST() {
  try {
    // TODO: セッション削除やトークン無効化処理
    // await destroySession();

    return NextResponse.json({
      success: true,
      message: 'ログアウトしました',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'ログアウトに失敗しました' },
      { status: 500 }
    );
  }
}
