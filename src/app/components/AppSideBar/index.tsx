import React, { useEffect, useState } from "react";
import history, { navigate, location } from "../../routes/history";
import * as Icon from "react-bootstrap-icons";

export default function AppSideBar() {
  const [currentRoute, setCurrentRoute] = useState("/");

  console.log(location);
  useEffect(() => {
    console.log(location?.pathname);
  });

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-white pt-4"
      style={{ width: 280 }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item my-2">
          <a
            className={
              "nav-link " + (currentRoute === "/" ? "active" : "link-dark")
            }
            onClick={() => {
              if (navigate) {
                navigate("/");
                setCurrentRoute("/");
              }
            }}
          >
            <Icon.HouseDoorFill className="bi me-2" />
            Home
          </a>
        </li>
        <li className="nav-item my-2">
          <a
            className={
              "nav-link " +
              (currentRoute === "/trades" ? "active" : "link-dark")
            }
            onClick={() => {
              if (navigate) {
                navigate("/trades");
                setCurrentRoute("/trades");
              }
            }}
          >
            <Icon.CurrencyExchange className="bi me-2" />
            Trade
          </a>
          {/*<Link to="/">Trade</Link>*/}
        </li>
      </ul>
      <hr />
    </div>
  );
}
