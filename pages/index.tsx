import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { HomePageProps } from "../interface/props/HomePageProps";
import styles from "../styles/Home.module.css";

const Home: NextPage<HomePageProps> = ({ ...props }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sans Brewery Sans Brewery Explorer</title>
        <meta name="description" content="powered by electricityp" />
        <link rel="icon" href="/favicon.ico" />
        <span>{props.messageOfTheDay}</span>
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

export async function getServerSideProps(context: NextPageContext) {
  const messageOfTheDay = "it is a nice day today";
  return {
    props: { messageOfTheDay: messageOfTheDay },
  };
}
