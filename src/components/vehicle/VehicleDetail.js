import React, { useContext, useEffect, useState } from "react";
import { VehicleContext } from "./VehicleProvider";
import "./Vehicle.css";
import { useParams, useHistory } from "react-router-dom";
import { MaintenanceContext } from "../maintenance/MaintenanceProvider.js"


export const VehicleDetail = () => {
  const { deleteVehicle, getVehicleById } = useContext(VehicleContext);
  const [vehicle, setVehicle] = useState({maintenances: []}); //explain what is happening here. is tis deconstructing location and customer to be allowed access in the return state
  const { deleteMaintenance } = useContext(MaintenanceContext)
  
  //location holds the initial state of the application
  //setLocation allows us to update state
  //useState() holds data. thats it
   //useParams() captures the parameter set in the url when Vehicle detail route is present?
  const { vehicleId } = useParams(); //dynamnic routing element

  const history = useHistory();

//useEffect runs everytime state changes
//whenever the vehicle detail route changes in the URL, useEffect() triggers to get the vehicle by id and display the information associated with the vehicleId. 
  useEffect(() => {
    getVehicleById(vehicleId)// 2
    .then(vehicle => { // 3
        setVehicle(vehicle) // 4
    })
    //whenever the vehicle detail route changes, useEffect() triggers
}, [vehicleId]) // 1 do i need vehicleId in here?
console.log(vehicleId)

  return (
    <section className="vehicle">
    <button className="button" onClick={() => {history.push("/vehicles")    
    deleteVehicle(vehicle.id)}}>Delete
    </button>
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
        vehicle.maintenances.map(maintenance => 
          <section className="maintenanceCard">
    <h3 className="maintenance__name">{maintenance.name}</h3>  
   

        <div className="Maintenance__date">Date: {maintenance.date }</div>
        <div className="Maintenance__itemsUsed">Items Used: {maintenance.itemsUsed }</div>
        <div className="Maintenance__timeSpent">Time Spent: {maintenance.timeSpent}</div>
        <div className="Maintenance__note">note: {maintenance.note }</div>
        <div className="Maintenance__maintenanceCost">Maintenance Cost: ${maintenance.maintenanceCost }</div>
        <button className="button" onClick={() => {history.push(`/vehicles`)
                                deleteMaintenance(maintenance.id)}}>Delete</button>
      
          <button className='edit' onClick={() => {
          history.push(`/maintenances/edit/${maintenance.id}`)
        }}>Edit</button>

    </section>
        )}   

        </div>
    </section>
  );
};