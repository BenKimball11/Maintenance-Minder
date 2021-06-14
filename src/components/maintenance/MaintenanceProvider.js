import React, { useState, createContext } from "react"

// module retrieves maintenance events from the DB in various ways to be utilized differently
export const MaintenanceContext = createContext()


export const MaintenanceProvider = (props) => {
    const [maintenance, setMaintenance] = useState([])
    const user = localStorage.getItem("MaintenanceMinder_user")

    //gets events using user ID and expanded to vehicle to attach specific vehicle to specific event
    const getMaintenance = () => {
        return fetch(`http://localhost:8088/maintenances/?userId=${user}&_expand=vehicle`)
            .then(res => res.json())
            .then(setMaintenance)
    }
    //uses the add maintenance form to add a new event to the DB
    const addMaintenance = maintenanceObj => {
        return fetch("http://localhost:8088/maintenances", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(maintenanceObj)
        })
            .then(getMaintenance)
    }
    //retrieves the event by its ID 
    const getMaintenanceById = (id) => {
        return fetch(`http://localhost:8088/maintenances/${id}`)
            .then(res => res.json())
    }
    //uses the maintenance form to edit an event and update the DB
    const updateMaintenance = maintenance => {
        return fetch(`http://localhost:8088/maintenances/${maintenance.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(maintenance)
        })
            .then(getMaintenance)
    }
    //uses the event ID to delete the event from the DB
    const deleteMaintenance = maintenanceId => {
        return fetch(`http://localhost:8088/maintenances/${maintenanceId}`, {
            method: "DELETE"
        })
            .then(getMaintenance)
    }


    // exports the function fetch calls via MaitenanceContext to be used throughout the modules
    return (
        <MaintenanceContext.Provider value={{
            maintenance, getMaintenance, addMaintenance, getMaintenanceById, updateMaintenance, deleteMaintenance
        }}>
            {props.children}
        </MaintenanceContext.Provider>
    )
}