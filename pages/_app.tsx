import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../common/Layout";
import { Brewery } from "../schema/Brewery";
import { BreweryOptionType } from "../common/BreweryOptionType";

function MyApp({ Component, pageProps }: AppProps) {
  const breweryAutoCompleteData: BreweryOptionType[] = [];

  if (pageProps.breweries) {
    pageProps.breweries.map((brewery: Brewery) => {
      breweryAutoCompleteData.push({
        breweryId: brewery.id,
        breweryName: brewery.name,
        breweryType: brewery.brewery_type,
      });
    });
  }

  return (
    <React.StrictMode>
      <Layout breweryAutoCompleteData={breweryAutoCompleteData}>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  );
}

export default MyApp;
