import React from "react";
import { NextPageContext } from "next";
import { Brewery } from "../../schema/Brewery";
import { fetchBrewery } from "../../common/BreweryDAL";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const Brewery = ({ ...props }) => {
  const breweryData: Brewery = props.brewery ?? {};
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: "1.5rem" }}
            color="text.secondary"
            gutterBottom
          >
            {breweryData.name}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography sx={{ mb: 1.5, fontSize: "1rem" }} color="text.secondary">
            {`${breweryData.country}, ${breweryData.brewery_type}`}
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2">
                state: {breweryData.county_province ?? "n/a"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">city: {breweryData.city}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                phone: {breweryData.phone ?? "n/a"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                phone: {breweryData.phone ?? "n/a"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
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
