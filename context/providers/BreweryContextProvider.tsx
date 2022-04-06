import React from "react";
import { BreweryCollection } from "../../schema/BreweryCollection";
import { BreweryContext } from "../BreweryContext";

export const BreweryContextProvider: React.FC = ({ ...props }) => {
  const context = React.useContext<BreweryCollection>(BreweryContext);

  return (
    <BreweryContext.Provider value={context}>
      {props.children}
    </BreweryContext.Provider>
  );
};
