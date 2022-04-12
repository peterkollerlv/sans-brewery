import React from "react";
import { NextPage, NextPageContext } from "next";
import { Brewery } from "../../schema/Brewery";
import { fetchBrewery } from "../../common/BreweryDAL";
import breweries from "../breweries";

const Brewery = ({ ...props }) => {
  return <>brewery detail {props.brewery?.name}</>;
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
