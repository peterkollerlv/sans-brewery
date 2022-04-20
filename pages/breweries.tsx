import React from "react";
import { Brewery } from "../schema/Brewery";
import {
  calculatePageSize,
  createBreweryDataRow,
  fetchBreweries,
} from "../common/BreweryDAL";
import { BreweriesStateActionType } from "../interface/state/BreweriesStateActionType";
import { breweriesReducer } from "../common/reducers/breweriesReducer";
import {
  Stack,
  Pagination,
  TableCell,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Container,
  Divider,
  Slider,
  Link,
  Box,
  useTheme,
} from "@mui/material";
import { APP_DEFAULT_ENTRIES_PER_PAGE_LIMIT } from "../configuration/AppDefaults";

const BreweriesPage = ({ ...props }) => {
  const theme = useTheme();

  const [breweryDataContext, dispatch] = React.useReducer(breweriesReducer, {
    breweries: [],
    pages: 0,
    currentPage: 0,
    entriesPerPage: props.appDefaults
      ? props.appDefaults.entriesPerPageLimit
      : APP_DEFAULT_ENTRIES_PER_PAGE_LIMIT,
  });

  React.useEffect(() => {
    const initialisePageData = async () => {
      const currentPageDefaultValue = props.breweries ? 1 : 0;
      dispatch({
        type: BreweriesStateActionType.SET_ALL,
        payload: {
          ...breweryDataContext,
          breweries: props.breweries,
          pages: calculatePageSize(
            props.breweries.length,
            breweryDataContext.entriesPerPage
          ),
          currentPage: currentPageDefaultValue,
        },
      });

      setCurrentPage(currentPageDefaultValue);
    };
    initialisePageData();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleEntriesPerPageChange = (
    event: Event,
    value: number | Array<number>,
    activeThumb: number
  ) => {
    console.log(`value: ${value}, activeThumb: ${activeThumb}`);
    dispatch({
      type: BreweriesStateActionType.SET_ENTRIES_PER_PAGE_LIMIT,
      payload: {
        ...breweryDataContext,
        entriesPerPage: value as number,
      },
    });
    setCurrentPage(breweryDataContext.breweries.length > 0 ? 1 : 0);
  };

  const setCurrentPage = (page: number) => {
    dispatch({
      type: BreweriesStateActionType.SET_CURRENT_PAGE,
      payload: {
        ...breweryDataContext,
        currentPage: page,
      },
    });
  };

  const getPaginationLabelText = (value: number) => {
    return `${value} / page`;
  };

  return (
    <Container>
      <Stack direction="column" spacing="4">
        <Typography color="primary" variant="h4">
          Sans Brewery Catalog
        </Typography>
        <Paper elevation={6} sx={{ borderRadius: "20px" }}>
          <TableContainer sx={{ borderRadius: "20px", height: "60vh" }}>
            <Table stickyHeader aria-label="brewery info table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{ border: 0 }}
                  >
                    <Typography color="primary" variant="h6">
                      Brewery Name
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="left"
                    component="th"
                    scope="row"
                    sx={{ border: 0 }}
                  >
                    <Typography color="primary" variant="h6">
                      Brewery Type
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& tr td": { padding: "1em" } }}>
                {breweryDataContext.breweries
                  .slice(
                    (breweryDataContext.currentPage - 1) *
                      breweryDataContext.entriesPerPage,
                    breweryDataContext.currentPage *
                      breweryDataContext.entriesPerPage
                  )
                  .map((brewery) => {
                    const rowData = createBreweryDataRow(brewery);

                    return (
                      <TableRow key={rowData.id}>
                        <TableCell align="left" sx={{ border: 0 }}>
                          <Link
                            href={`/brewery/${rowData.id}`}
                            sx={{ textDecoration: "none", cursor: "pointer" }}
                          >
                            <Typography color="primary" variant="body2">
                              {rowData.name}
                            </Typography>
                          </Link>
                        </TableCell>

                        <TableCell align="left" sx={{ border: 0 }}>
                          <Typography color="primary" variant="body2">
                            {rowData.brewery_type}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
          <Box
            sx={{
              padding: "1em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Slider
              sx={{
                width: 200,
                marginTop: "1.2em",
                "& > span > span": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.background.default,
                },
              }}
              color="primary"
              defaultValue={breweryDataContext.entriesPerPage}
              aria-label="Entries Per Page"
              valueLabelDisplay="on"
              value={breweryDataContext.entriesPerPage}
              valueLabelFormat={getPaginationLabelText}
              min={1}
              max={breweryDataContext.breweries.length}
              onChange={handleEntriesPerPageChange}
            />
            <Divider />
            <Pagination
              sx={{
                "& ul li button": {
                  color: theme.palette.primary.main,
                  "&.Mui-selected": {
                    color: theme.palette.secondary.main,
                  },
                },
              }}
              count={breweryDataContext.pages}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              page={breweryDataContext.currentPage}
              disabled={breweryDataContext.breweries.length < 1}
            />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default BreweriesPage;

export const getServerSideProps = async () => {
  try {
    const breweries: Brewery[] = await fetchBreweries();
    console.log(`breweries length: ${breweries ? breweries.length : 0}`);
    return {
      props: {
        breweries: breweries ?? [],
        appDefaults: {
          entriesPerPageLimit: 10,
        },
      },
    };
  } catch (error) {
    console.error(error);
  }
};
