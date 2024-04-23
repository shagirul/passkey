import {
  checkAuth,
  connectDB,
  asyncError,
  errorHandler,
} from "../../../utils/features";
import { Handle } from "../../../models/password";

const handler = asyncError(async (req, res) => {
  await connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const handleId = req.query.id;

  const handle = await Handle.findOne({ _id: handleId }).select("+password");

  if (!handle) return errorHandler(res, 404, "Task not found");

  if (req.method === "PUT") {
    const { title, password, uid } = req.body;
    if (!title || !password || !uid)
      return errorHandler(res, 400, "Please Enter All fields");

    handle.title = title;
    handle.password = password;
    handle.uid = uid;
    await handle.save();

    res.status(200).json({
      success: true,
      message: "Handle Updated Successfully",
    });
  } else if (req.method === "DELETE") {
    await handle.deleteOne();

    res.status(200).json({
      success: true,
      message: "Handle Deleted Successfully",
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      success: true,
      handle,
    });
  } else {
    errorHandler(res, 400, "This method is not available");
  }
});

export default handler;
