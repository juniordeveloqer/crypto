import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Çerezi sil
    res.setHeader('Set-Cookie', serialize('token', '', {
      httpOnly: true,
      expires: new Date(0), // Geçerlilik süresini 0 yaparak çerezi sil
      path: '/',
    }));

    // Başarıyla çıkış yapıldığını belirt
    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
