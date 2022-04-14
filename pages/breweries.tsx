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
} from "@mui/material";
import styles from "../styles/BreweriesPage.module.css";
import { APP_DEFAULT_ENTRIES_PER_PAGE_LIMIT } from "../configuration/AppDefaults";

const BreweriesPage = ({ ...props }) => {
  if (props.appDefaults) {
  }
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
    <Container className={styles.container}>
      <Stack direction="column" spacing="4">
        <Typography
          sx={{ color: "var(--primary-color)" }}
          variant="h4"
          className={styles.title}
        >
          Sans Brewery Catalog
        </Typography>
        <Paper elevation={6}>
          <TableContainer className={styles.tableContainer}>
            <Table
              stickyHeader
              aria-label="brewery info table"
              className={styles.breweriesTable}
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left" component="th" scope="row">
                    <Typography variant="h6">Brewery Name</Typography>
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    <Typography variant="h6">Brewery Type</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                      <TableRow
                        key={rowData.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          <Link href={`/brewery/${rowData.id}`}>
                            <Typography variant="body2">
                              {rowData.name}
                            </Typography>
                          </Link>
                        </TableCell>

                        <TableCell align="left">
                          <Typography variant="body2">
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
          <div className={styles.pagination}>
            <Slider
              sx={{ width: 200, marginTop: "1.2em" }}
              color="primary"
              defaultValue={breweryDataContext.entriesPerPage}
              aria-label="Entries Per Page"
              valueLabelDisplay="on"
              value={breweryDataContext.entriesPerPage}
              valueLabelFormat={getPaginationLabelText}
              min={1}
              max={breweryDataContext.breweries.length}
              onChange={handleEntriesPerPageChange}
              className={styles.slider}
            />
            <Divider />
            <Pagination
              count={breweryDataContext.pages}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              page={breweryDataContext.currentPage}
              disabled={breweryDataContext.breweries.length < 1}
            />
          </div>
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
