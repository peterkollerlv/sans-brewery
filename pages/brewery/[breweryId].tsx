import React from "react";
import { NextPageContext } from "next";
import { Brewery } from "../../schema/Brewery";
import { fetchBrewery } from "../../common/BreweryDAL";
import {
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Link,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { BreweryDetailRow } from "../../components/BreweryDetailRow";

const Brewery = ({ ...props }) => {
  const breweryData: Brewery = props.brewery ?? {};
  return (
    <Box
      sx={{
        width: "40vw",
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Card sx={{ borderRadius: "20px" }}>
        <Box sx={{ padding: "0.5em" }}>
          <Link href="/breweries">
            <ArrowBackIosOutlinedIcon />
          </Link>
        </Box>
        <CardContent>
          <Typography sx={{ fontSize: "1.5rem" }} gutterBottom color="primary">
            {breweryData.name}
          </Typography>

          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ borderRadius: "20px" }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ border: 0 }}>
                  <TableCell colSpan={2} sx={{ border: 0 }}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: "1rem",
                      }}
                      color="primary"
                    >
                      {`${breweryData.country}, ${
                        breweryData.county_province
                          ? breweryData.state + ", "
                          : ""
                      } Brewery Type: ${breweryData.brewery_type}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ "& tr td": { padding: "1em" } }}>
                <BreweryDetailRow
                  entryKey={"city"}
                  entryValue={breweryData.city}
                />
                <BreweryDetailRow
                  entryKey={"street"}
                  entryValue={breweryData.street}
                />
                <BreweryDetailRow
                  entryKey={"address 2"}
                  entryValue={breweryData.address_2}
                />
                <BreweryDetailRow
                  entryKey={"address 3"}
                  entryValue={breweryData.address_3}
                />
                <BreweryDetailRow
                  entryKey={"zip"}
                  entryValue={breweryData.postal_code}
                />
                {breweryData.longitude && breweryData.latitude ? (
                  <BreweryDetailRow
                    entryKey={"coordinates"}
                    entryValue={`Lng: ${breweryData.longitude}, Lat: ${breweryData.latitude}`}
                  />
                ) : null}
                <BreweryDetailRow
                  entryKey={"phone"}
                  entryValue={breweryData.phone?.toString()}
                />
                <BreweryDetailRow
                  entryKey={"website"}
                  entryValue={breweryData.website_url}
                  asLink
                />
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Brewery;

export const getServerSideProps = async (context: NextPageContext) => {
  try {
    const id = context?.query?.breweryId ?? "";
    console.log(`brewery id: ${JSON.stringify(id)}`);
    const brewery: Brewery = await fetchBrewery(id as string);

    if (!brewery) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
    return {
      props: {
        brewery: brewery ?? null,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
