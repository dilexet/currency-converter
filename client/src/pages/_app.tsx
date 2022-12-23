import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { wrapper } from "../redux/store";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
