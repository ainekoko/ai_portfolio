import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default function sendmail(req: NextApiRequest, res: NextApiResponse) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  //管理人が受け取るメール
  const toHostMailData = {
    from: `${req.body.email}`,
    to: 'shincode0712@gmail.com',
    subject: `【お問い合わせ】${req.body.name}様より`,
    text: req.body.message + ' | Sent from: ' + req.body.email,
    html: `
      <p>【名前】</p>
      <p>${req.body.name}</p>
      <p>【メッセージ】</p>
      <p>${req.body.message}</p>
      <p>【メールアドレス】</p>
      <p>${req.body.email}</p>
    `,
  };

  transporter.sendMail(toHostMailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  res.send('success');
}
