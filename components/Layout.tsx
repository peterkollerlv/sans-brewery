import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  AppBar,
  Autocomplete,
  Box,
  createFilterOptions,
  createTheme,
  IconButton,
  Popper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import SportsBarOutlinedIcon from "@mui/icons-material/SportsBarOutlined";
import { BreweryOptionType } from "../schema/BreweryOptionType";
import { orange, yellow } from "@mui/material/colors";
import { SansTheme } from "../interface/SansTheme";
import { APP_AUTOCOMPLETE_OPTIONS_LIMIT } from "../configuration/AppDefaults";

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

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[600],
      },
      secondary: {
        main: yellow[300],
      },
      background: {
        default: yellow[200],
        paper: yellow[200],
      },
    },
  });

  const filterOptions = createFilterOptions<BreweryOptionType>({
    limit: APP_AUTOCOMPLETE_OPTIONS_LIMIT,
  });

  return (
    <ThemeProvider<SansTheme> theme={theme}>
      <Box sx={{ margin: 0, padding: 0, width: "100vw", minHeight: "100vh" }}>
        <Head>
          <title>Sans Brewery Sans Brewery Explorer</title>
          <meta name="description" content="powered by electricity" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppBar
          position="static"
          sx={{
            height: "4em",
          }}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
            >
              <a href="/">
                <SportsBarOutlinedIcon
                  sx={{ fontSize: "2em" }}
                  color="primary"
                />
              </a>
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="primary"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Sans Brewery Explorer
            </Typography>

            {breweryAutoCompleteData.length > 0 ? (
              <Autocomplete
                color="primary"
                sx={{
                  width: "30vw",
                  "& > div > div::before": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  },
                  "& > div > div:hover:not(.Mui-disabled)::before": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  },
                  "& > div > div:hover:not(.Mui-disabled)::after": {
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                  },
                }}
                options={breweryAutoCompleteData}
                filterOptions={filterOptions}
                getOptionLabel={(option: BreweryOptionType) => option.name}
                autoComplete
                includeInputInList
                onChange={(e, value) => {
                  if (value) {
                    router.push(`/brewery/${value.id}`);
                  }
                }}
                PopperComponent={(props) => {
                  return (
                    <Popper
                      {...props}
                      sx={{
                        "& ul > li": {
                          color: theme.palette.primary.main,
                        },
                      }}
                      placement="bottom-start"
                    />
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    type="text"
                    label="Search Breweries"
                    variant="standard"
                    InputLabelProps={{
                      style: {
                        color: theme.palette.primary.main,
                        opacity: 0.5,
                      },
                    }}
                    sx={{
                      " & input": { color: theme.palette.primary.main },
                      "& svg": { color: theme.palette.primary.main },
                    }}
                  />
                )}
              />
            ) : null}
          </Toolbar>
        </AppBar>

        <main>
          <Box
            sx={{
              padding: "2em",
              backgroundColor: theme.palette.background.default,
              minHeight: "calc(100vh - 6em)",
            }}
          >
            {props.children}
          </Box>
        </main>

        <footer>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              height: "2em",
              minWidth: "100%",
              padding: "0 2em",
              textAlign: "right",
            }}
          >
            <Typography color="primary">sans brewery catalog 2022</Typography>
          </Box>
        </footer>
      </Box>
    </ThemeProvider>
  );
};
