import React from "react";
import type { AppProps } from "next/app";
import { Layout } from "../components/Layout";
import { Brewery } from "../schema/Brewery";
import { BreweryOptionType } from "../schema/BreweryOptionType";
import "../styles/globals.css";

const SansBreweryApp = ({ Component, pageProps }: AppProps) => {
  const breweryAutoCompleteData: BreweryOptionType[] = [];

  if (pageProps.breweries) {
    pageProps.breweries.map((brewery: Brewery) => {
      breweryAutoCompleteData.push({
        id: brewery.id,
        name: brewery.name,
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
};

export default SansBreweryApp;
