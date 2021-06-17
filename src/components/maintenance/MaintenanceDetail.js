/* import { useHistory } from "react-router-dom";
import "./Maintenance.css";
//The expression can be a React variable, or property, or any other valid JavaScript expression. 
//JSX will execute the expression and return the result:
export const MaintenanceDetail = ( { maintenance , maintenanceDelete } ) => {
 //const { Maintenance , MaintenanceDelete } =useContext(MaintenanceContext)
  
    const history = useHistory();





  return (
    <section className="maintenanceCard">
    <h3 className="maintenance__name">{maintenance.name}</h3>  
   

        <div className="Maintenance__date">Date: {maintenance.date }</div>
        <div className="Maintenance__itemsUsed">Items Used: {maintenance.itemsUsed }</div>
        <div className="Maintenance__timeSpent">Time Spent: {maintenance.timeSpent}</div>
        <div className="Maintenance__note">note: {maintenance.note }</div>
        <div className="Maintenance__maintenanceCost">Maintenance Cost: {maintenance.maintenanceCost }</div>
      <button className="deleteBtn"
          onClick={() => maintenanceDelete(maintenance.id)}>
          Remove Maintenance 
      </button>
          <button className='edit' onClick={() => {
          history.push(`/maintenances/edit/${maintenance.id}`)
        }}>Edit</button>

    </section>
  )
  } */