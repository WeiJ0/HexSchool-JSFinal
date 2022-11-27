// redux
import { store } from '../src/store/store';
import { Provider } from 'react-redux'

// next.js & ui framework
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
// custom theme for ui framework
import theme from "../src/helpers/custsom.js";
// custom css
import "../src/styles/globals.css";

// Layout
import Layout from "../src/Layout/Layout";


export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>WeCoding</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </Provider>
    </>
  );
}
