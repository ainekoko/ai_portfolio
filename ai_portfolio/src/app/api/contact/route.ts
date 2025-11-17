import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: '全ての項目を入力してください' },
        { status: 400 }
      );
    }

    // Nodemailerのトランスポーターを設定
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS使用
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // メールを送信
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      subject: `[Ais_Portfolio お問い合わせ] ${name}様より`,
      text: `
        名前: ${name}
        メールアドレス: ${email}
        メッセージ: ${message}
              `,
      html: `
        <p>【名前】${name}</p>
        <p>【メールアドレス】${email}</p>
        <p>【お問い合わせ内容】</p>
        <div>${message.replace(/\n/g, '<br>')}</div>
      `,
    });

    return NextResponse.json(
      { success: true, message: 'メールが送信されました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { success: false, error: 'メールの送信に失敗しました' },
      { status: 500 }
    );
  }
}
