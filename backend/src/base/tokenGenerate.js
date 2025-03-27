import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expires: "10m",
  });
  const refreshToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expires: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
};
export default generateTokens;
