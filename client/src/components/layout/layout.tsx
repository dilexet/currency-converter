import { Provider } from "react-redux";
import { Box, CssBaseline } from "@mui/material";
import store from "../../store";
import HeaderContainer from "../../containers/header/header-container";
import FooterContainer from "../../containers/footer/footer-container";
import { ILayoutProps } from "../../types/layout/layout-props";

const Layout = ({ children }: ILayoutProps) => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default Layout;