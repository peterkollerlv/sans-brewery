import { BreweriesState } from "./BreweriesState";
import { BreweriesStateActionType } from "./BreweriesStateActionType";

export interface BreweriesStateAction {
  type: BreweriesStateActionType;
  payload: BreweriesState;
}
