import React from "react";
import { NextPage, NextPageContext } from "next";
import { BreweriesPageProps } from "../interface/BreweriesPageProps";
import { Brewery } from "../schema/Brewery";
import { fetchBreweries } from "../common/BreweryDAL";
import { BreweriesState } from "../interface/BreweriesState";
import { BreweriesStateActionType } from "../interface/BreweriesStateActionType";

const BreweriesPage: NextPage<BreweriesPageProps> = ({ ...props }) => {
  const initialState: BreweriesState = { breweries: [] };

  interface BreweriesStateAction {
    type: BreweriesStateActionType;
    payload: BreweriesState;
  }

  const breweriesReducer = (
    state: BreweriesState,
    action: BreweriesStateAction
  ): BreweriesState => {
    const { type: actionType, payload } = action;
    switch (actionType) {
      case BreweriesStateActionType.SET_ALL:
        state.breweries = [...payload.breweries];
        return payload;
      default:
        return payload;
    }
  };

  const [state, dispatch] = React.useReducer(breweriesReducer, initialState);

  React.useEffect(() => {
    dispatch({
      type: BreweriesStateActionType.SET_ALL,
      payload: { breweries: props.breweries },
    });

    console.log("useEffect: dispatch");
  }, []);

  return (
    <div>
      hi,{" "}
      {state.breweries.map((brewery) => {
        console.log(`breweries: ${JSON.stringify(brewery.name)}`);
        <span>{brewery.name}</span>;
        //return brewery.name;
      })}
    </div>
  );
};

export default BreweriesPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const breweries: Brewery[] = await fetchBreweries();
  breweries.push(...breweries);
  console.log(`breweries: ${JSON.stringify(breweries)}`);
  return {
    props: { breweries: breweries },
  };
};
