import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Box, CssBaseline } from "@mui/material";
import store from "../store";
import HeaderContainer from "../containers/header/header-container";
import FooterContainer from "../containers/footer/footer-container";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
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
          <Component {...pageProps} />
          <FooterContainer />
        </CssBaseline>
      </Box>
    </Provider>
  );
};

export default App;
