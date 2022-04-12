import React from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import styles from "../styles/Layout.module.css";

const Layout = ({ ...props }) => {
  return (
    <Container className={styles.container}>
      <Head>
        <title>Sans Brewery Sans Brewery Explorer</title>
        <meta name="description" content="powered by electricity" />
        <link rel="icon" href="/favicon.ico" />
        <span>{props.messageOfTheDay}</span>
      </Head>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>brew footer. 2022</footer>
    </Container>
  );
};

export default Layout;
