import Link from "next/link";
import { Typography, Link as LinkMaterial } from "@mui/material";
import { APP_NAME } from "../../constants/shared/base.constants";

const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <LinkMaterial
        color="inherit"
        component={Link}
        href="/"
        style={{ textDecoration: "none" }}>
        {APP_NAME}
      </LinkMaterial>
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
