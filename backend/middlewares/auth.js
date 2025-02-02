import jwt from "jsonwebtoken";

const authMiddelware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized login again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.SECRET_TOKEN);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while authorization" });
  }
};

export default authMiddelware;
