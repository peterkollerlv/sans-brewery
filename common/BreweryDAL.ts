import { Brewery } from "../schema/Brewery";

export const fetchBreweries = async (): Promise<Brewery[]> => {
  const breweries: Promise<Brewery[]> = fetch(
    "https://api.openbrewerydb.org/breweries",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const breweriesRes = await breweries;
  return breweriesRes;
};
