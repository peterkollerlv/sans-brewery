import { BreweriesState } from "../../interface/state/BreweriesState";
import { BreweriesStateAction } from "../../interface/state/BreweriesStateAction";
import { BreweriesStateActionType } from "../../interface/state/BreweriesStateActionType";

export const breweriesReducer = (
  state: BreweriesState,
  action: BreweriesStateAction
): BreweriesState => {
  const { type: actionType, payload } = action;
  switch (actionType) {
    case BreweriesStateActionType.SET_ALL:
      return {
        ...state,
        breweries: payload.breweries,
        pages: payload.pages,
        currentPage: payload.currentPage,
      };
    case BreweriesStateActionType.SET_CURRENT_PAGE:
      console.log(`reducer setCurrentPage: ${payload.currentPage}`);
      return {
        ...state,
        currentPage: payload.currentPage,
      };
    default:
      return state;
  }
};
