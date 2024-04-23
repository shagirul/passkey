import { asyncError, errorHandler } from "../../../utils/features";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");

  const { password, encodedpassword } = req.body;

  if (!password) return errorHandler(res, 400, "Please enter the pin");

  const isMatch = await bcrypt.compare(password, encodedpassword);

  if (!isMatch) return errorHandler(res, 400, "Invalid Password");

  res.status(200).json({
    success: true,
    valid: isMatch,
  });
});

export default handler;
