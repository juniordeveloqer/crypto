import jwt from "jsonwebtoken";
import User from "../models/userModel";  // Model dosya yolunu kontrol edin
import { setCookie } from "cookies-next";  // Cookie yönetimi için

// Token oluşturma
const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: "3d" });
};

// Kullanıcı kaydı
export const signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled." });
  }

  try {
    // Kullanıcıyı kaydet
    const user = await User.signup(email, password);
    
    if (!user) {
      return res.status(400).json({ error: "Signup failed, user not created." });
    }

    // Token oluştur
    const token = createToken(user._id);

    // Tokenı cookie içine koy
    setCookie("token", token, {
      req,
      res,
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 gün
    });

    return res.status(200).json({ email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Kullanıcı girişi
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields must be filled." });
  }

  try {
    // Kullanıcıyı giriş yaptır
    const user = await User.login(email, password);

    if (!user) {
      return res.status(400).json({ error: "Login failed." });
    }

    // Token oluştur
    const token = createToken(user._id);

    // Tokenı cookie içine koy
    setCookie("token", token, {
      req,
      res,
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 gün
    });

    return res.status(200).json({ email });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
