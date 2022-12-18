import Link from "next/link";
import { Typography, Link as LinkMaterial } from "@mui/material";
import { APP_NAME } from "../../constants/shared/base.constants";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link href={"/"}
            style={{ textDecoration: "none" }}>
        <LinkMaterial color="inherit" style={{ textDecoration: "none" }}>
          {APP_NAME}
        </LinkMaterial>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
