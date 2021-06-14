import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <div class="animation start-home"></div>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Maintenance Minder</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="/vehicles">Vehicles</Link>
            </li>
        
            <li className="navbar__item">
                <Link className="navbar__link" to="/employees">Logout</Link>
            </li>
        </ul>
    )
}