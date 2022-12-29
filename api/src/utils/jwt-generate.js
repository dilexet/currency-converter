import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtGenerate = (user, role) => {
  if (user && user.id && role && role.name && role.id) {
    const accessPayload = {
      userId: user.id,
      roleId: role.id,
      roleName: role.name,
    };
    const accessTokenPrivateKet = process.env.ACCESS_TOKEN_SECRET;
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      algorithm: process.env.ALGORITHM,
    };
    const jwtToken = jwt.sign(
      accessPayload,
      accessTokenPrivateKet,
      accessTokenOptions,
    );
    return jwtToken ?? null;
  }
  return null;
};

export default jwtGenerate;
