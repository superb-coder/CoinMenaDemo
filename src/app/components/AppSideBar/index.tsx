import React, { useEffect, useState } from "react";
import history from "../../routes/history";
import * as Icon from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

export default function AppSideBar() {
  const [currentRoute, setCurrentRoute] = useState("/");
  let navigate = useNavigate();

  useEffect(() => {
    history.listen((location) => setCurrentRoute(location.location.pathname));
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
            onClick={() => navigate("/")}
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
            onClick={() => navigate("/trades")}
          >
            <Icon.CurrencyExchange className="bi me-2" />
            Trade
          </a>
        </li>
      </ul>
      <hr />
    </div>
  );
}
