import React from "react";
import { NextPageContext } from "next";
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
} from "@mui/material";
import { createBreweryDataRow } from "../common/createBreweryDataRow";
import styles from "../styles/BreweriesPage.module.css";
import { calculatePageSize } from "../common/calculatePageSize";

const BreweriesPage = ({ ...props }) => {
  const [breweryDataContext, dispatch] = React.useReducer(breweriesReducer, {
    breweries: [],
    pages: 0,
    currentPage: 0,
    pageSize: 10,
  });

  React.useEffect(() => {
    const initialisePageData = async () => {
      dispatch({
        type: BreweriesStateActionType.SET_ALL,
        payload: {
          ...breweryDataContext,
          breweries: props.breweries,
          pages: calculatePageSize(
            props.breweries.length,
            breweryDataContext.pageSize
          ),
          currentPage: props.breweries ? 1 : 0,
        },
      });

      setCurrentPage(props.breweries ? 1 : 0);
    };
    initialisePageData();
  }, []);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // console.log(`handleChange value: ${value}`);
    setCurrentPage(value);
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

  return (
    <Container className={styles.container}>
      <Stack direction="column" spacing="4">
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table aria-label="brewery info table">
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
                    breweryDataContext.pageSize,
                  breweryDataContext.currentPage * breweryDataContext.pageSize
                )
                //.slice(17, 19)
                .map((brewery) => {
                  const rowData = createBreweryDataRow(brewery);

                  return (
                    <TableRow
                      key={rowData.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Typography variant="body2">{rowData.name}</Typography>
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
      props: { breweries: breweries ?? [] },
    };
  } catch (error) {
    console.error(error);
  }
};
