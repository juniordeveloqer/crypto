// pages/api/user/signup.js
import connectToDatabase from "../../../lib/dbConnect"; // MongoDB bağlanma fonksiyonunun yolu

import User from "../../models/userModel"; // Model dosya yolunu kontrol edin
import jwt from "jsonwebtoken";
import cookie from "cookie";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields must be filled." });
    }

    try {
      await connectToDatabase(); // MongoDB bağlantısını burada başlat
      const user = await User.signup(email, password);

      if (!user) {
        return res
          .status(400)
          .json({ error: "Signup failed, user not created." });
      }

      const token = createToken(user._id);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60,
          path: "/",
        })
      );

      return res.status(200).json({ email });
    } catch (error) {
      console.error("Signup error:", error.message);
      return res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
