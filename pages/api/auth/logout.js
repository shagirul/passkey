import {
  asyncError,
  errorHandler,
  cookieSetter,
  clearCookie,
} from "../../../utils/features";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET Method is allowed");

  cookieSetter(res, null, false);
  clearCookie("token");
  res.status(200).json({
    success: true,
    message: `Logged Out Successfully`,
  });
  toast.success("Logged Out");
});

export default handler;
