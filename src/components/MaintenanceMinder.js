import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./MaintenanceMinder.css";

export const MaintenanceMinder = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("maintenanceMinder_user")) {
          return (
            <>
              <h2>Maintenance Minder</h2>
              <NavBar />              
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
