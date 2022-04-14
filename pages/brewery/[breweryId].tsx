import React from "react";
import { NextPageContext } from "next";
import { Brewery } from "../../schema/Brewery";
import { fetchBrewery } from "../../common/BreweryDAL";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import styles from "../../styles/Brewery.module.css";
import { BreweryDetailRow } from "../../components/BreweryDetailRow";

const Brewery = ({ ...props }) => {
  const breweryData: Brewery = props.brewery ?? {};
  return (
    <div className={styles.container}>
      <Card className={styles.detailCard}>
        <div className={styles.backButton}>
          <a href="/breweries">
            <ArrowBackIosOutlinedIcon />
          </a>
        </div>
        <CardContent>
          <Typography
            sx={{ fontSize: "1.5rem", color: "var(--primary-color)" }}
            gutterBottom
          >
            {breweryData.name}
          </Typography>

          <TableContainer component={Paper} className={styles.detailsTable}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: "1rem",
                        color: "var(--primary-color)",
                      }}
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
              <TableBody>
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
    </div>
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
