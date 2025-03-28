import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign(
      { userId: userId },
      process.env.JWT_SECRET_KEY,
    );
    // const refreshToken = jwt.sign(
    //   { userId: userId },
    //   process.env.JWT_SECRET_KEY,
    //   {
    //     expiresIn: "7d",
    //   },
    // );
    return {
      accessToken,
      // refreshToken,
    };
  } catch (err) {
    console.log(err);
  }
};
export default generateTokens;
