import { ContactFormValues } from '@/validations/contracts';

export const postContactEmailApi = async (data: ContactFormValues) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'メールの送信に失敗しました');
  }

  return result;
};
