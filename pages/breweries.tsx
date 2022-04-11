import React from "react";
import { NextPage, NextPageContext } from "next";
import { BreweriesPageProps } from "../interface/props/BreweriesPageProps";
import { Brewery } from "../schema/Brewery";
import { fetchBreweries } from "../common/BreweryDAL";
import { BreweriesState } from "../interface/state/BreweriesState";
import { BreweriesStateActionType } from "../interface/state/BreweriesStateActionType";
import { breweriesReducer } from "../context/reducers/breweriesReducer";
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
} from "@mui/material";
import { BreweryRowData } from "../schema/BreweryRowData";

const BreweriesPage = ({ ...props }) => {
  const [breweryDataContext, dispatch] = React.useReducer(breweriesReducer, {
    breweries: [],
  });

  React.useEffect(() => {
    dispatch({
      type: BreweriesStateActionType.SET_ALL,
      payload: { breweries: props.breweries },
    });
  }, []);

  const createData = (brewery: Brewery): BreweryRowData => {
    return {
      id: brewery.id,
      name: brewery.name,
      brewery_type: brewery.brewery_type,
    };
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing="4">
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                {breweryDataContext.breweries.map((brewery) => {
                  const rowData = createData(brewery);

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
        </Box>
        <Box>
          <Pagination count={2} color="primary" />
        </Box>
      </Stack>
    </Container>
  );
};

export default BreweriesPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const breweries: Brewery[] = await fetchBreweries();
  console.log(`breweries length: ${breweries.length}`);
  return {
    props: { breweries: breweries },
  };
};
