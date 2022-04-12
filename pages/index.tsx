import { Box, Typography } from "@mui/material";
import type { NextPage, NextPageContext } from "next";
import { HomePageProps } from "../interface/props/HomePageProps";

const Home: NextPage<HomePageProps> = ({ ...props }) => {
  return (
    <Box>
      <Typography variant="h2">
        Welcome to Sans Brewery Explorer <br />
      </Typography>
      <Typography variant="button">
        <a href="/breweries">Explore Breweries</a>
      </Typography>
    </Box>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const messageOfTheDay = "it is a nice day today";
  return {
    props: { messageOfTheDay: messageOfTheDay },
  };
}
