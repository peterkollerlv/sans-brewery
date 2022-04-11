import { Brewery } from "../schema/Brewery";
import { BreweryRowData } from "../schema/BreweryRowData";

export const createBreweryDataRow = (brewery: Brewery): BreweryRowData => {
  return {
    id: brewery.id,
    name: brewery.name,
    brewery_type: brewery.brewery_type,
  };
};
