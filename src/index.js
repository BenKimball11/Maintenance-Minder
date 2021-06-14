import React from "react"
import ReactDOM  from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { MaintenanceMinder } from "./components/MaintenanceMinder"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <MaintenanceMinder />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)