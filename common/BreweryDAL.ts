import { Brewery } from "../schema/Brewery";
import { BreweryRowData } from "../schema/BreweryRowData";

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

export const fetchBrewery = async (id: string): Promise<Brewery> => {
  const brewery: Promise<Brewery> = fetch(
    `https://api.openbrewerydb.org/breweries/${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const breweryRes = await brewery;
  return breweryRes;
};

export const createBreweryDataRow = (brewery: Brewery): BreweryRowData => {
  return {
    id: brewery.id,
    name: brewery.name,
    brewery_type: brewery.brewery_type,
  };
};

export const calculatePageSize = (itemCount: number, pageSize: number) => {
  const itemCountPerPage = Math.round(itemCount / pageSize);
  const fullPagesCount = Math.round(
    itemCount % pageSize > 0 ? itemCountPerPage + 1 : itemCountPerPage
  );

  return fullPagesCount;
};
