import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload, User } from "@/lib/definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Encrypt payload and generate JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// Decrypt JWT and return payload
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    // Ensure payload is of type SessionPayload
    return payload as SessionPayload;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to verify session:", error.message);
    } else {
      console.error("An unknown error occurred during session verification");
    }
    return null; // Return null if decryption fails
  }
}

// Create and set session cookie
export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const sessionPayload: SessionPayload = {
    userId: user._id,
    role: user.role,
    createdAt: new Date(),
    expiresAt: expiresAt,
  };

  const session = await encrypt(sessionPayload);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return session;
}

// Update session expiration time
export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  // Ensure payload is of type SessionPayload
  const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newSessionPayload: SessionPayload = {
    userId: payload.userId,
    role: payload.role,
    createdAt: payload.createdAt,
    expiresAt: newExpiresAt,
  };

  const newSession = await encrypt(newSessionPayload);

  cookies().set("session", newSession, {
    httpOnly: true,
    secure: true,
    expires: newExpiresAt,
    sameSite: "lax",
    path: "/",
  });

  return newSession;
}

// Delete session cookie
export function deleteSession() {
  cookies().delete("session");
}
