// src/app/api/contact/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export default function sendGmail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  //管理人が受け取るメールの内容
  const mailOptions = {
    from: req.body.email,
    to: process.env.MAIL_TO,
    subject: '[Ais_Portfolio お問い合わせ] ' + req.body.name + '様より',
    text: `${req.body.message} \n\n 返信先メールアドレス: ${req.body.email}`,
    html: `
    <p>【名前】${req.body.name}</p>
    <p>【お問い合わせ内容】</p>
    <div>${req.body.message}</div>
    <p>【メールアドレス】</p>
    <p> ${req.body.email}</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('メールの送信に失敗しました。');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('メールが正常に送信されました。');
    }
  });
  return NextResponse.json({ message: 'メール送信処理実行' });
}

// // GETメソッドも追加(動作確認用)
// export async function GET() {
//   return NextResponse.json(
//     { message: 'Contact API is working!' },
//     { status: 200 }
//   );
// }
