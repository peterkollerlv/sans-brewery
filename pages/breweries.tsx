import React from "react";
import { Brewery } from "../schema/Brewery";
import { fetchBreweries } from "../common/BreweryDAL";
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
  Box,
  Divider,
  Slider,
  Link,
} from "@mui/material";
import { createBreweryDataRow } from "../common/createBreweryDataRow";
import styles from "../styles/BreweriesPage.module.css";
import { calculatePageSize } from "../common/calculatePageSize";
import { APP_DEFAULT_ENTRIES_PER_PAGE_LIMIT } from "../common/AppDefaults";

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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
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

  const valuetext = (value: number) => {
    return `${value} / page`;
  };

  return (
    <Container className={styles.container}>
      <Stack direction="column" spacing="4">
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table
            stickyHeader
            aria-label="brewery info table"
            className={styles.tableHeader}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  <Typography variant="h3">Sans Brewery Catalog</Typography>
                </TableCell>
              </TableRow>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
        <Paper className={styles.pagination}>
          <Slider
            sx={{ width: 200, marginTop: "1.2em" }}
            defaultValue={breweryDataContext.entriesPerPage}
            aria-label="Entries Per Page"
            valueLabelDisplay="on"
            value={breweryDataContext.entriesPerPage}
            valueLabelFormat={valuetext}
            min={1}
            max={breweryDataContext.breweries.length}
            onChange={handleEntriesPerPageChange}
            className={styles.slider}
          />
          <Divider />
          <Pagination
            count={breweryDataContext.pages}
            onChange={handleChange}
            color="primary"
            showFirstButton
            showLastButton
            page={breweryDataContext.currentPage}
            disabled={breweryDataContext.breweries.length < 1}
          />
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
