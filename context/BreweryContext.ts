import React from "react";
import { BreweryCollection } from "../schema/BreweryCollection";

export const BreweryContext = React.createContext<BreweryCollection>({breweries: []})