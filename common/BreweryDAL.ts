import { Brewery } from "../schema/Brewery";

export const fetchBreweries = async (): Promise<Brewery[]> => {
  const breweries = await fetch("https://api.openbrewerydb.org/breweries", {
    method: "GET",
  });

  const breweriesRes = await breweries.json();
  return breweriesRes;
};
