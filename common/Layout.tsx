import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";
import styles from "../styles/Layout.module.css";
import { BreweryOptionType } from "./BreweryOptionType";

export const Layout = ({ ...props }) => {
  const router = useRouter();

  const [breweryAutoCompleteData, setBreweryAutoCompleteData] = React.useState<
    BreweryOptionType[]
  >([]);

  React.useEffect(() => {
    const setBreweryData = () => {
      setBreweryAutoCompleteData(props.breweryAutoCompleteData ?? []);
    };

    setBreweryData();
  }, []);

  return (
    <Container className={styles.container}>
      <Head>
        <title>Sans Brewery Sans Brewery Explorer</title>
        <meta name="description" content="powered by electricity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="static"
        sx={{
          color: "var(--primary-color)",
          backgroundColor: "var(--primary-background-color)",
          height: "4em",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <a href="/">
              <SportsBarOutlinedIcon sx={{ fontSize: "2em" }} />
            </a>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sans Brewery Explorer
          </Typography>

          {breweryAutoCompleteData.length > 0 ? (
            <Autocomplete
              id="auto-complete"
              sx={{
                width: "30vw",
                "& input": { color: "var(--primary-color)" },
                "& select": { color: "var(--secondary-color)" },
              }}
              className={styles.autoComplete}
              options={breweryAutoCompleteData}
              getOptionLabel={(option: BreweryOptionType) => option.breweryName}
              autoComplete
              includeInputInList
              onChange={(e, value) => {
                if (value) {
                  router.push(`/brewery/${value.breweryId}`);
                }
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <TextField
                    type="text"
                    {...params}
                    label="breweries"
                    variant="standard"
                  />
                </div>
              )}
            />
          ) : null}
        </Toolbar>
      </AppBar>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>sans brewery catalog 2022</footer>
    </Container>
  );
};
