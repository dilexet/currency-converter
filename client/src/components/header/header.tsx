import { AppBar, Box, Toolbar, Typography, Link, Grid } from "@mui/material";
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
            <Typography
              variant="h6"
              color="inherit"
              style={{ textDecoration: "none", marginRight: "10px" }}
              component={Link}
              href="/"
            >
              {APP_NAME}
            </Typography>
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
                <Link
                  sx={{ my: 1, mx: 1.5 }}
                  variant="button"
                  component={Link}
                  href={
                    currentPath === CURRENCY_CONVERTER.path
                      ? CURRENCY_LIST.path
                      : CURRENCY_CONVERTER.path
                  }
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
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
