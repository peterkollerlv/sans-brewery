import React from "react";
import { NextPage, NextPageContext } from "next";
import { BreweriesPageProps } from "../interface/props/BreweriesPageProps";
import { Brewery } from "../schema/Brewery";
import { fetchBreweries } from "../common/BreweryDAL";
import { BreweriesState } from "../interface/state/BreweriesState";
import { BreweriesStateActionType } from "../interface/state/BreweriesStateActionType";
import { breweriesReducer } from "../context/reducers/breweriesReducer";

const BreweriesPage = ({ ...props }) => {
  const [breweryDataContext, dispatch] = React.useReducer(breweriesReducer, {
    breweries: [],
  });

  React.useEffect(() => {
    dispatch({
      type: BreweriesStateActionType.SET_ALL,
      payload: { breweries: props.breweries },
    });
  }, []);

  return (
    <div>
      hi,{" "}
      <ol>
        {breweryDataContext.breweries.map((brewery) => {
          return (
            <li key={brewery.id}>
              <span>brewer name: {brewery.name}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BreweriesPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const breweries: Brewery[] = await fetchBreweries();
  console.log(`breweries length: ${breweries.length}`);
  return {
    props: { breweries: breweries },
  };
};
