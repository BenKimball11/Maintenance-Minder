import React, { useState, createContext } from "react"

// module retrieves maintenance events from the DB in various ways to be utilized differently
export const MaintenanceContext = createContext()


export const MaintenanceProvider = (props) => {
    const [maintenances, setMaintenance] = useState([])

    //const user = localStorage.getItem("MaintenanceMinder_user")

    //gets events using user ID and expanded to vehicle to attach specific vehicle to specific event
    const getMaintenances = () => {
        return fetch(`http://localhost:8088/maintenances?_embed=vehicles`)
            .then(res => res.json())
            .then(setMaintenance)
    }

    const getMaintenanceById = maintenanceId => {
        return fetch(`http://localhost:8088/maintenances/${maintenanceId}?_embed=vehicles`)
            .then(res => res.json())
    }

    //uses the add maintenance form to add a new event to the DB
    const addMaintenance = maintenanceObj => {
        return fetch("http://localhost:8088/maintenances?_embed=vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(maintenanceObj)
        })
            .then(getMaintenances)
    }
    //retrieves the event by its ID 
    //uses the maintenance form to edit an event and update the DB
    const updateMaintenance = maintenance => {
        return fetch(`http://localhost:8088/maintenances/${maintenance.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(maintenance)
        })
            .then(getMaintenances)
    }
    //uses the event ID to delete the event from the DB
    const deleteMaintenance = maintenanceId => {
        return fetch(`http://localhost:8088/maintenances/${maintenanceId}`, {
            method: "DELETE"
        })
            .then(getMaintenances)
    }


    // exports the function fetch calls via MaitenanceContext to be used throughout the modules
    return (
        <MaintenanceContext.Provider value={{
            maintenances, getMaintenances, addMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance
        }}>
            {props.children}
        </MaintenanceContext.Provider>
    )
}