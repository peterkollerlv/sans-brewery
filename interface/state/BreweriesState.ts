import { Brewery } from "../../schema/Brewery";

export interface BreweriesState {
  breweries: Brewery[];
  pages: number;
  currentPage: number;
  pageSize: number;
}
