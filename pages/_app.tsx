import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../common/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  );
}

export default MyApp;
