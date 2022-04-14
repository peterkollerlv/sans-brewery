import type { NextPage } from "next";
import { HomePageProps } from "../interface/props/HomePageProps";
import { Box, Typography, useTheme } from "@mui/material";
import { SansTheme } from "../interface/SansTheme";

const Home: NextPage<HomePageProps> = ({ ...props }) => {
  const theme = useTheme<SansTheme>();
  return (
    <Box>
      <Typography variant="h3" color="primary">
        Welcome to Sans Brewery Explorer <br />
      </Typography>

      <Typography variant="body1" color="primary">
        {props.messageOfTheDay} <br />
      </Typography>
      <a href="/breweries">
        <Box
          sx={{
            marginTop: "4em",
            marginRight: "auto",
            marginLeft: "auto",
            width: "50vw",
            textAlign: "center",
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: "2em",
            "& span": {
              fontSize: "2em",
            },
          }}
        >
          <Typography variant="button" color="primary">
            Explore Breweries
          </Typography>
        </Box>
      </a>
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
