import React from "react";
import "./App.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/redux/store";
import DefaultApp from "./app/index";
import AppSideBar from "./app/components/AppSideBar";
import AppHeader from "./app/components/AppHeader";
import { setupHttpConfig } from "./app/utils/http";

function App() {
  setupHttpConfig();
  return (
    <Provider store={store}>
      <main>
        <AppHeader />
        <div className="flex-fill d-flex flex-rows body">
          <AppSideBar />
          <BrowserRouter>
            <DefaultApp />
          </BrowserRouter>
        </div>
      </main>
    </Provider>
  );
}

export default App;
