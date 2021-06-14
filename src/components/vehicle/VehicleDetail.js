import React, { useContext, useEffect, useState } from "react";
import { VehicleContext } from "./VehicleProvider";
import "./Vehicle.css";
import { useParams, useHistory } from "react-router-dom";
import { MaintenanceContext } from "../maintenance/MaintenanceProvider.js"
import { MaintenanceDetail } from "../maintenance/MaintenanceDetail.js"

export const VehicleDetail = () => {
  const { vehicles, deleteVehicle } = useContext(VehicleContext);
  const { deleteMaintenance } = useContext(MaintenanceContext)
   //location holds the initial state of the application
    //setLocation allows us to update state
    //useState() holds data. thats it
  const [vehicle, setVehicle] = useState({ maintenance: {} }); //explain what is happening here. is tis deconstructing location and customer to be allowed access in the return state

  /*
        Given the example URL above, this will store the value
        of 5 in the VehicleId variable
    */
   //useParams() captures the parameter set in the url when Vehicle detail route is present?
  const { vehicleId } = useParams();

  const history = useHistory();

  const removeVehicle = () => {
    deleteVehicle(vehicle.id).then(() => {
      history.push("/vehicles");
    });
  };

  const removeMaintenance = () => {
    deleteMaintenance(vehicle.id).then(() => {
      history.push("/vehicles");
    });
  };

  useEffect(() => {
    const thisVehicle = vehicles.find((v) => v.id === parseInt(vehicleId)) || {
      maintenance: {}
    };
    setVehicle(thisVehicle);
  }, [vehicleId]);


  return (
    <section className="vehicle">
     <button onClick={removeVehicle}>Delete Vehicle</button>
      <button
        onClick={() => {
          history.push(`/vehicles/edit/${vehicle.id}`);
        }}
      >
        Edit
      </button>
      <h3 className="vehicle__make">{vehicle.vehicleMake}</h3>
      <div className="vehicle__year">Year: {vehicle.vehicleYear}</div>
      <div className="vehicle__model">Model: {vehicle.vehicleModel}</div>
     
      <button className='add__maintenance' onClick={() => {
          history.push(`/maintenances/create/${vehicleId}`)
        }}>Add New Maintenance</button>

        <div className="maintenanceCards">
          {
            vehicle.maintenances?.map(e => {
              e.vehicle = vehicle
              return <MaintenanceDetail key={e.id} maintenance={e} maintenanceDelete={removeMaintenance} />
            })}
        </div>

    </section>
  );
};