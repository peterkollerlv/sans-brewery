import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sans Brewery Sans Brewery Explorer</title>
        <meta name="description" content="powered by electricityp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Welcome to Sans Brewery Explorer <br />

        <a href="/breweries">Explore Breweries</a>
      </main>

      <footer className={styles.footer}>brew footer. 2022</footer>
    </div>
  );
};

export default Home;
