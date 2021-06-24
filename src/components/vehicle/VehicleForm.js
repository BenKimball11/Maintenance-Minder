import React, { useContext, useEffect, useState } from "react"
import { VehicleContext } from "../vehicle/VehicleProvider"
import "./Vehicle.css"
import { useHistory, useParams } from 'react-router-dom';

export const VehicleForm = () => {
    const { addVehicle, getVehicleById, updateVehicle } = useContext(VehicleContext)

    //for edit, hold on to state of Vehicle in this view
    const [vehicle, setVehicle] = useState({})
    //wait for data before button is active
   /*  const [isLoading, setIsLoading] = useState(true); */

    const {vehicleId} = useParams();
	  const history = useHistory();

      const user = localStorage.getItem("maintenanceMinder_user")

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newVehicle = { ...vehicle }
      //Vehicle is an object with properties.
      //set the property to the new value
      newVehicle[event.target.name] = event.target.value
      //update state
      setVehicle(newVehicle)
    }

    const handleSaveVehicle = () => {
    
        //disable the button - no extra clicks
        if (vehicleId){
          //PUT - update
          updateVehicle({
              id: vehicle.id,
              userId: parseInt(user),
              vehicleYear: vehicle.vehicleYear,
              vehicleMake: vehicle.vehicleMake,
              vehicleModel: vehicle.vehicleModel
          })
          .then(() => history.push(`/vehicles/detail/${vehicle.id}`))
        }else {
          //POST - add
          addVehicle({
            userId: parseInt(user),
            vehicleYear: vehicle.vehicleYear,
            vehicleMake: vehicle.vehicleMake,
            vehicleModel: vehicle.vehicleModel
          })
          .then(() => history.push("/vehicles"))       
      }
    }

    // Get customers and locations. If VehicleId is in the URL, getVehicleById
    useEffect(() => {
        if (vehicleId) {
          getVehicleById(vehicleId)
            .then(vehicle => {
              setVehicle(vehicle)
            })
          }   
      }, [])// this array is empty is because the vehicle doesnt exist yet
            // the empty array on the useEffect runs on page load. If there is nothing to watch, then it just runs the function inside it.

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="vehicleForm">
        <h2 className="vehicleForm__title">{vehicleId ? <>Edit Vehicle</> : <>New Vehicle</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="vehicleYear">Vehicle Year: </label>
            <input type="text" id="vehicleYear" name="vehicleYear" required autoFocus className="form-control"
            placeholder="Vehicle Year"
            onChange={handleControlledInputChange}
            value={vehicle.vehicleYear}/>
          </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <label htmlFor="vehicleMake">Vehicle Make:</label>
          <input type="text" id="vehicleMake" name="vehicleMake" required autoFocus className="form-control" placeholder="Vehicle Make" value={vehicle.vehicleMake} onChange={handleControlledInputChange}
          value={vehicle.vehicleMake} />
        </div>
      </fieldset>
        <fieldset>
        <div className="form-group">
          <label htmlFor="vehicleModel">Vehicle Model:</label>
          <input type="text" id="vehicleModel" name="vehicleModel" required autoFocus className="form-control" placeholder="Vehicle Model" value={vehicle.vehicleModel} onChange={handleControlledInputChange}
          value={vehicle.vehicleModel} />
        </div>
      </fieldset>
        
        <button className="btn btn-primary"
          
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleSaveVehicle()
          }}>
        {vehicleId ? <>Save Vehicle</> : <>Add Vehicle</>}</button>
      </form>
    )
}