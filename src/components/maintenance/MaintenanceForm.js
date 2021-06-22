import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { VehicleContext } from "../vehicle/VehicleProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./Maintenance.css";


export const MaintenanceForm = () => {
    const { addMaintenance, getMaintenanceById, updateMaintenance } = useContext(MaintenanceContext);
    const { vehicles, getVehicles } = useContext(VehicleContext);
    /* useState declares the default state of the functions.
    First thing in the array (vehicle) is always the current state
    second thing in the array (setvehicle) allows you to update the current state   */
    const [maintenance, setMaintenance] = useState({})
         

      const {maintenanceId, vehicleId} = useParams()
      
      const history = useHistory()
      
      const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newMaintenance = { ...maintenance }
        //vehicle is an object with properties.
        //set the property to the new value
        newMaintenance[event.target.id] = event.target.value
        //update state
        setMaintenance(newMaintenance)
      }
    
    const handleSaveMaintenance = () => {
    const user = localStorage.getItem("maintenanceMinder_user")

      if (maintenanceId){
        updateMaintenance({
          id: parseInt(maintenance.id),
          userId: parseInt(user),
          vehicleId:parseInt(maintenance.vehicleId),
          date: maintenance.date,
          name: maintenance.name,
          itemsUsed: maintenance.itemsUsed,
          timeSpent: maintenance.timeSpent,
          note: maintenance.note,
          maintenanceCost: parseInt(maintenance.maintenanceCost),
        })
        .then(() => history.push(`/vehicles/detail/${maintenance.vehicleId}`))
      }else{
        
        addMaintenance({
          id: parseInt(maintenance.id),
          userId: parseInt(user),
          vehicleId: parseInt(vehicleId),
          date: maintenance.date,
          name: maintenance.name,
          itemsUsed: maintenance.itemsUsed,
          timeSpent: maintenance.timeSpent,
          note: maintenance.note,
          maintenanceCost: parseInt(maintenance.maintenanceCost),
        })
        .then(() => history.push(`/vehicles/detail/${vehicleId}`))
    }
  }

  // Populates the forms with existing data if there is any
  useEffect(() => {
    getVehicles().then(() => {
      if (maintenanceId){
        getMaintenanceById(maintenanceId)
        .then(maintenance => {
            setMaintenance(maintenance)          
        })
      }
    })
  }, [])

 
    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="MaintenanceForm">
         <h2 className="MaintenanceForm__title">{maintenanceId ? <>Edit Maintenance</> : <>New Maintenance</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Maintenance:</label>
                  <input value={maintenance.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={maintenance.name}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input value={maintenance.date} type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" value={maintenance.date}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="itemsUsed">Items Used:</label>
                  <input value={maintenance.itemsUsed} type="text" id="itemsUsed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Items Used" value={maintenance.itemsUsed}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="timeSpent">Time Spent:</label>
                  <input value={maintenance.timeSpent} type="text" id="timeSpent" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Time Spent" value={maintenance.timeSpent}/>
              </div>
          </fieldset>
          
          <fieldset>
              <div className="form-group">
                  <label htmlFor="note">Note:</label>
                  <input value={maintenance.note} type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Note" value={maintenance.note}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="maintenanceCost">Maintenance Cost:</label>
                  <input value={maintenance.maintenanceCost} type="text" id="maintenanceCost" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Maintenance Cost" value={maintenance.maintenanceCost}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveMaintenance();
          }}>
     {maintenanceId ? <>Save Maintenance</> : <>Add Maintenance</>}</button> 
          
      </form>
    )
} 