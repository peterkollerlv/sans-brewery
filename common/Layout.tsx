import React from "react";
import Head from "next/head";
import {
  AppBar,
  Autocomplete,
  Box,
  Container,
  IconButton,
  InputBase,
  styled,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "../styles/Layout.module.css";
import { Search } from "@mui/icons-material";

interface BreweryOptionType {
  breweryName: string;
  breweryType: string;
}

export const Layout = ({ ...props }) => {
  const defaultProps = {
    options: [{breweryName: "Borsodi", breweryType: "micro"}],
    getOptionLabel: (option: BreweryOptionType) => option.breweryName,
  };
  return (
    <Container className={styles.container}>
      <Head>
        <title>Sans Brewery Sans Brewery Explorer</title>
        <meta name="description" content="powered by electricity" />
        <link rel="icon" href="/favicon.ico" />
        <span>{props.messageOfTheDay}</span>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              "ikon"
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Autocomplete
              {...defaultProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="autoComplete"
                  variant="standard"
                />
              )}
            />
          </Toolbar>
        </AppBar>
      </Box>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>brew footer. 2022</footer>
    </Container>
  );
};
