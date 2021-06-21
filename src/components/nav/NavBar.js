import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">

            <li className="navbar__item">
                <Link className="navbar__link" to="/vehicles">Vehicles</Link>
            </li>

            <li className="navbar__item">
                <div><a href="https://www.youtube.com/playlist?list=PL84eIFNMHoyMCKs-jMJgMAy_1M4k5pEBW">Maintenance How To's</a></div>
            </li> 

            <li className="navbar__item">
                <Link className="navbar__link" to="/login" onClick={() => {
                    localStorage.removeItem("maintenanceMinder_user")
                }}>Logout</Link>
            </li>
        </ul>
    )
}