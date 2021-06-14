import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const VehicleContext = createContext()

// This component establishes what data can be used.
export const VehicleProvider = (props) => {
    const [vehicles, setVehicles] = useState([])

    const getVehicles = () => {
        return fetch("http://localhost:8088/vehicles")
        .then(res => res.json())
        .then(setVehicles)
    }

    const addVehicle = vehicleObj => {
        return fetch("http://localhost:8088/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleObj)
        })
        .then(getVehicles)
    }

    const updateVehicle = vehicle => {
        return fetch(`http://localhost:8088/vehicles/${vehicle.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicle)
        })
        .then(getVehicles)
    }

    const deleteVehicle = vehicleId => {
        return fetch(`http://localhost:8088/vehicles/${vehicleId}`, {
            method: "DELETE"
        })
        .then(getVehicles)
    }

    const getVehicleById = vehicleId => {
        return fetch (`http://localhost:8088/vehicles/${vehicleId}`)
        .then(res => res.json())
    }

    /*
        You return a context provider which has the
        `Vehicles` state, `getVehicles` function,
        and the `addVehicle` function as keys. This
        allows any child elements to access them.
    */
    return (
        <VehicleContext.Provider value={{
            vehicles, getVehicles, addVehicle, updateVehicle, getVehicleById, deleteVehicle
        }}>
            {props.children}
        </VehicleContext.Provider>
    )
}
