import { Box, CssBaseline } from "@mui/material";
import HeaderContainer from "../../containers/header/header-container";
import FooterContainer from "../../containers/footer/footer-container";
import { ILayoutProps } from "../../types/layout/layout-props";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline>
        <HeaderContainer />
        <main>
          {children}
        </main>
        <FooterContainer />
      </CssBaseline>
    </Box>
  );
};

export default Layout;