import { Handle } from "@/models/password";
import {
  checkAuth,
  connectDB,
  asyncError,
  errorHandler,
} from "../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");
  await connectDB();

  const { title, password, uid } = req.body;

  if (!title || !password || !uid)
    return errorHandler(res, 400, "Please Enter All fields");

  const user = await checkAuth(req);

  if (!user) return errorHandler(res, 401, "Login First");

  await Handle.create({
    title,
    password,
    user: user._id,
    uid: uid,
  });

  res.json({
    success: true,
    message: "Handle Added",
  });
});

export default handler;
