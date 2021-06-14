import React from "react";
import { Route } from "react-router-dom";
import { VehicleProvider } from "./vehicle/VehicleProvider";
import { MaintenanceProvider } from "./maintenance/MaintenanceProvider";
import { VehicleList } from "./vehicle/VehicleList";
import { VehicleDetail } from "./vehicle/VehicleDetail";
import { MaintenanceDetail } from "./maintenance/MaintenanceDetail";
import { VehicleForm } from "./vehicle/VehicleForm";
import { MaintenanceForm } from "./maintenance/MaintenanceForm";

export const ApplicationViews = () => {
  return (
    <>
      <VehicleProvider>
        <MaintenanceProvider>
          <Route exact path="/vehicles/detail/:vehicleId(\d+)">
            <VehicleDetail />
          </Route>
          <Route exact path="/vehicles/create">
            <VehicleForm />
          </Route>

          <Route exact path="/vehicles">
            <VehicleList />
          </Route>

          <Route exact path="/vehicles/edit/:vehicleId(\d+)">          
            {/* the (/d+) means to only capture if its a decimal */}
            <VehicleForm />
          </Route>

          <Route exact path="/maintenances/create/:workoutId(\d+)">
            <MaintenanceForm />
          </Route>

          <Route exact path="/maintenances/detail/:maintenanceId(\d+)">
            <MaintenanceDetail />
          </Route>

        </MaintenanceProvider>
      </VehicleProvider>
    </>
  );
};
