import { createBrowserHistory, Location } from "history";
import { NavigateFunction } from "react-router/lib/hooks";

export var navigate: undefined | NavigateFunction = undefined;
export var location: undefined | Location = undefined;
export default createBrowserHistory();

export function setNavigate(nav: NavigateFunction) {
  navigate = nav;
}

export function setLocation(loc: Location) {
  location = loc;
}
