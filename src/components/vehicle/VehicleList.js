import React, { useState, useContext, useEffect } from "react";
import { VehicleContext } from "./VehicleProvider";
import { Vehicle } from "./Vehicle";
import "./Vehicle.css";
import { useHistory } from "react-router-dom";

export const VehicleList = () => {
  //Need a little more help understanding this
  //I think what is happening is passing in the VehicleContext from VehicleProvider, then? I know it accesses the keys, but how is fuzzy
  const { getVehicles, vehicles } = useContext(VehicleContext);

  const history = useHistory();
  // Initialization effect hook -> Go get Vehicle data
  //The useEffect() hook allows the component to reach out into the world for anything that cannot be handled during render
  //it is the API call for the Vehicles.
  useEffect(() => {
    getVehicles();
    /*  The dependency array. Logic within functions only occur when a function is invoked. 
        Within a React component, useEffect is a function. 
        After the return, useEffect is automatically invoked and since the dependency array is empty, 
        it only runs the first time the component renders. 
        You can include dependencies in the array to cause the useEffect to run additional times.*/
  }, []); //like a .then() method?

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
