import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { store, wrapper } from "../redux/store";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default wrapper.withRedux(App);
