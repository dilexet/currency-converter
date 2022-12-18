import { AppBar, Box, Toolbar, Typography, Link as LinkMaterial, Grid } from "@mui/material";
import Link from "next/link";
import { IHeaderComponentProps } from "../../types/header/header-component-props";
import { APP_NAME } from "../../constants/shared/base.constants";
import {
  CURRENCY_CONVERTER,
  CURRENCY_LIST,
} from "../../constants/header/base-routes.constants";

const Header = ({ currentPath }: IHeaderComponentProps) => {
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            style={{
              width: "25%",
            }}
          >
            <Link href="/" style={{
              textDecoration: "none",
            }}>
              <Typography
                variant="h6"
                color="inherit"
                style={{ marginRight: "10px" }}
              >
                {APP_NAME}
              </Typography>
            </Link>
          </Box>
          <Box
            style={{
              width: "75%",
            }}
          >
            <Grid
              container
              columnSpacing={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Grid item>
                <LinkMaterial
                  sx={{ my: 1, mx: 1.5 }}
                  variant="button"
                  component={Link}
                  href={currentPath === CURRENCY_CONVERTER.path
                    ? CURRENCY_LIST.path
                    : CURRENCY_CONVERTER.path}
                  style={{
                    textDecoration: "none",
                    marginLeft: "20px",
                    opacity: "0.9",
                    fontSize: "1em",
                    fontWeight: "400",
                    textTransform: "none",
                  }}
                >
                  {currentPath === CURRENCY_CONVERTER.path
                    ? CURRENCY_LIST.display
                    : CURRENCY_CONVERTER.display}
                </LinkMaterial>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
