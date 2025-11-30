// src/validations/contracts.ts
import { z } from 'zod';

export const ContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: '名前の入力をお願いします' })
    .max(50, { message: '名前は50文字以内で入力してください' }),
  email: z
    .string()
    .email({ message: '正しいメールアドレスを入力してください' }),
  message: z.string().min(5, { message: 'お問い合わせ内容を入力してください' }),
});
export type ContactFormValues = z.infer<typeof ContactSchema>;
