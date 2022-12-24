import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants/token.constants.js";

const tokenGeneration = (user, role) => {
  if (user && user.id && role && role.name && role.id) {
    const token = jwt.sign(
      {
        id: user.id,
        roleId: role.id,
        roleName: role.name,
      },
      TOKEN_SECRET,
      {
        expiresIn: "30d",
      },
    );
    return token ?? null;
  }
  return null;
};

export default tokenGeneration;
