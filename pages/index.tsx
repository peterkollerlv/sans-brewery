import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { HomePageProps } from "../interface/props/HomePageProps";
import styles from "../styles/Home.module.css";

const Home: NextPage<HomePageProps> = ({ ...props }) => {
  return (
    <Box>
      <Typography variant="h3" sx={{ color: "var(--primary-color)" }}>
        Welcome to Sans Brewery Explorer <br />
      </Typography>

      <Typography variant="body1" sx={{ color: "var(--primary-color)" }}>
        {props.messageOfTheDay} <br />
      </Typography>

      <div className={styles.exploreAction}>
        <Typography variant="button">
          <a href="/breweries">Explore Breweries</a>
        </Typography>
      </div>
    </Box>
  );
};

export default Home;

export async function getServerSideProps() {
  const messageOfTheDay = "it is a nice day today";
  return {
    props: { messageOfTheDay: messageOfTheDay },
  };
}
