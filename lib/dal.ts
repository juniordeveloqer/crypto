// lib/dal.js
import { jwtVerify } from 'jose';

const secretKey = process.env.SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function verifySession(sessionCookie) {
  if (!sessionCookie) {
    console.log('No session cookie found');
    return null;
  }

  try {
    const { payload } = await jwtVerify(sessionCookie, encodedKey, {
      algorithms: ['HS256'],
    });

    console.log('Verified Session:', payload); // Debug log
    return payload; // Return the payload if the session is verified
  } catch (error) {
    console.error('Session verification failed:', error.message);
    return null; // Return null if verification fails
  }
}
