import { serialize } from "cookie";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import CryptoJS from "crypto-js";
// import bcrypt from "bcrypt";
import { useContext } from "react";
import { Context } from "@/components/client";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then((c) => console.log(`DB Connected to ${c.connection.host}`));
  } catch (error) {
    console.log(error);
  }
};
export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const asyncError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch((err) => {
    return errorHandler(res, 500, err.message);
  });
};

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
    })
  );
};
export function clearCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};

export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return errorHandler(res, 401, "Login First");

  const token = cookie.split("token=")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};
export function encryptPassword(password, key) {
  return CryptoJS.AES.encrypt(password, key).toString();
}

// Decrypt function
export function decryptPassword(encryptedPassword, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
// export const checkPassword = async (password) => {
//   const { user } = useContext(Context);

//   const isMatch = await bcrypt.compare(password, user.password);
//   return isMatch;
// };
