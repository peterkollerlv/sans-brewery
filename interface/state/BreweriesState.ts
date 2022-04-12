import { Brewery } from "../../schema/Brewery";

export interface BreweriesState {
  breweries: Brewery[];
  pages: number;
  currentPage: number;
  entriesPerPage: number;
}
