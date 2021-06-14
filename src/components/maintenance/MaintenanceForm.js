import React, { useContext, useEffect, useState } from "react";
import { MaintenanceContext } from "./MaintenanceProvider";
import { useHistory, useParams } from 'react-router-dom';
import "./Maintenance.css";


export const MaintenanceForm = () => {
    const { addMaintenance, getMaintenanceById, updateMaintenance } = useContext(MaintenanceContext);
    /* useState declares the default state of the functions.
    First thing in the array (vehicle) is always the current state
    second thing in the array (setvehicle) allows you to update the current state   */
    const [maintenance, setMaintenance] = useState({})
         

    
      //const [isLoading, setIsLoading] = useState(true)
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

    if (maintenance.vehicleId === 0 || maintenance.name === "" || maintenance.weightUsed === "" || maintenance.restInterval === "")  {
      window.alert("Please fill out the fields")
    } else {
      //setIsLoading(true);
      if (maintenanceId){
        updateMaintenance({
          id: parseInt(maintenance.id),
          userId: parseInt(user),
          vehicleId:parseInt(maintenance.vehicleId),
          date: Date(),
          name: maintenance.name,
          itemsUsed: maintenance.itemsUsed,
          timeSpent: maintenance.timeSpent,
          note: maintenance.note,
        })
        .then(() => history.push(`/vehicles/detail/${maintenance.vehicleId}`))
      }else{
        
       // setIsLoading(true);
        addMaintenance({
          id: parseInt(maintenance.id),
          userId: parseInt(user),
          vehicleId:parseInt(vehicleId),
          date: Date(),
          name: maintenance.name,
          itemsUsed: maintenance.itemsUsed,
          timeSpent: maintenance.timeSpent,
          note: maintenance.note,
          maintenanceCost: maintenance.maintenanceCost,
        })
        .then(() => history.push(`/vehicles/detail/${vehicleId}`))
      }
    }
  }

  // Populates the forms with existing data if there is any
    useEffect(() => {
        if (maintenanceId){
          getMaintenanceById(maintenanceId)
          .then(maintenance => {
              setMaintenance(maintenance)
             // setIsLoading(false)
          })
        } else {
          //setIsLoading(false)
        }
    }, 
    [])

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="MaintenanceForm">
         <h2 className="MaintenanceForm__title">{maintenanceId ? <>Edit Maintenance</> : <>New Maintenance</>}</h2>
          <fieldset>
              <div className="form-group">
                  <label htmlFor="name">Maintenance:</label>
                  <input defaultValue={maintenance.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={maintenance.name}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input defaultValue={maintenance.date} type="date" id="date" onChange={handleControlledInputChange} required autoFocus className="form-control" value={maintenance.date}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="itemsUsed">Items Used:</label>
                  <input defaultValue={maintenance.itemsUsed} type="text" id="itemsUsed" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Items Used" value={maintenance.itemsUsed}/>
              </div>
          </fieldset>

          <fieldset>
              <div className="form-group">
                  <label htmlFor="timeSpent">Time Spent:</label>
                  <input defaultValue={maintenance.timeSpent} type="text" id="timeSpent" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Time Spent" value={maintenance.timeSpent}/>
              </div>
          </fieldset>
          
          <fieldset>
              <div className="form-group">
                  <label htmlFor="note">Note:</label>
                  <input defaultValue={maintenance.note} type="text" id="note" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Note" value={maintenance.note}/>
              </div>
          </fieldset>
        
          <fieldset>
              <div className="form-group">
                  <label htmlFor="maintenanceCost">Maintenance Cost:</label>
                  <input defaultValue={maintenance.maintenanceCost} type="text" id="maintenanceCost" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Maintenance Cost" value={maintenance.maintenanceCost}/>
              </div>
          </fieldset>
          <button className="btn btn-primary"
          //disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveMaintenance();
          }}>
     {maintenanceId ? <>Save Maintenance</> : <>Add Maintenance</>}</button> 
          
      </form>
    )
} 