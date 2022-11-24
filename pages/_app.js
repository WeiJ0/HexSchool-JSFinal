import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import Layout from "../src/Layout/Layout";

import theme from "../src/custsom.js";
import "../src/styles/globals.css";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>WeCoding</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
