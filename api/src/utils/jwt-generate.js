import jwt from "jsonwebtoken";
import "dotenv/config";

const jwtGenerate = (user, role) => {
  if (user && user.id && role && role.name && role.id) {
    const token = jwt.sign(
      {
        id: user.id,
        roleId: role.id,
        roleName: role.name,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "30d",
      },
    );
    return token ?? null;
  }
  return null;
};

export default jwtGenerate;
