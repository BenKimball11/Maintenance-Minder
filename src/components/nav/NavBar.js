import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
           {/*  <li className="navbar__item active">
                <Link className="navbar__link" to="/">Maintenance Minder</Link>
            </li> */}

            <li className="navbar__item">
                <Link className="navbar__link" to="/vehicles">Vehicles</Link>
            </li>
        
            <li className="navbar__item">
                <Link className="navbar__link" to="/login" onClick={() => {
                    localStorage.removeItem("maintenanceMinder_users")
                }}>
                
                Logout</Link>
            </li>
        </ul>
    )
}