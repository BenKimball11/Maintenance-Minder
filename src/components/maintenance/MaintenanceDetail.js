import React, { useContext, useEffect, useState } from "react"
import { MaintenanceContext } from "./MaintenanceProvider"
import "./Maintenance.css"
import { useParams } from "react-router-dom"

export const MaintenanceDetail = () => {
    const {maintenances } = useContext(MaintenanceContext)
    const [maintenance, setMaintenance ] = useState({ location: {}, customer: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in themaintenanceId variable
    */
    const {maintenanceId } = useParams();


    useEffect(() => {
        const thisMaintenance =maintenances.find(a => a.id === parseInt(maintenanceId)) || { location: {}, customer: {} }

        setMaintenance(thisMaintenance)
    }, [maintenanceId])

    return (
    <section className="Maintenance">
        <h3 className="Maintenance__name">{maintenance.name }</h3>
        <div className="Maintenance__date">Date: {maintenance.location.name }</div>
        <div className="Maintenance__itemsUsed">Items Used: {maintenance.itemsUsed }</div>
        <div className="Maintenance__timeSpent">Time Spent: {maintenance.timeSpent}</div>
        <div className="Maintenance__note">note: {maintenance.note }</div>
        <div className="Maintenance__maintenanceCost">Maintenance Cost: {maintenance.maintenanceCost }</div>
    </section>
    )
}