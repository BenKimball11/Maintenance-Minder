import React, { useState, useContext, useEffect } from "react";
import { VehicleContext } from "./VehicleProvider";
//import { Vehicle } from "./Vehicle";
import "./Vehicle.css";
import { useHistory } from "react-router-dom";

export const VehicleList = () => {
  //Need a little more help understanding this
  //I think what is happening is passing in the VehicleContext from VehicleProvider,
  //deconstructing that object from VehicleContext to just return getVehicles and vehicles
  const { getVehicles, vehicles } = useContext(VehicleContext);

  const history = useHistory();
  //The useEffect() hook allows the component to reach out into the world for anything that cannot be handled during render
  //it is the API call for the getVehicles function.
  //useEffect must always take a function and an array
  //function comes first (getVehicles), then the array []
  useEffect(() => {
    getVehicles(); 
  }, []); 

  return (
    <>
      <h1>Vehicles</h1>

      <button onClick={() => history.push("/vehicles/create")}>
        Add Vehicle
      </button>

      <div className="vehicles">
        {vehicles.map((vehicle) => (
          <div className="vehicle" id={`vehicle--${vehicle.id}`}>
            <div className="vehicle__make">

            {vehicle.vehicleYear} {vehicle.vehicleMake} {vehicle.vehicleModel}
            
           </div>

            <div className="vehicleButton">
              <button onClick={() => history.push(`/vehicles/detail/${vehicle.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
