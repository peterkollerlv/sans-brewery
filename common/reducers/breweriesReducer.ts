import { BreweriesState } from "../../interface/state/BreweriesState";
import { BreweriesStateAction } from "../../interface/state/BreweriesStateAction";
import { BreweriesStateActionType } from "../../interface/state/BreweriesStateActionType";
import { calculatePageSize } from "../calculatePageSize";

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
      return {
        ...state,
        currentPage: payload.currentPage,
      };
    case BreweriesStateActionType.SET_ENTRIES_PER_PAGE_LIMIT:
      return {
        ...state,
        entriesPerPage: payload.entriesPerPage,
        pages: calculatePageSize(state.breweries.length, state.entriesPerPage),
      };
    default:
      return state;
  }
};
