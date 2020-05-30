import React from "react"
import './style.css'
import Menu from "../Menu"
import Notifications from "../Notifications"

const Header = (props) => (
    <div className="header-main">
        <div className="header-menu">
            <Menu></Menu>
        </div>
        <div className="header-content">
            {props.children}
        </div>
        <div className="header-notifications">
            <Notifications></Notifications>
        </div>
    </div>
)

export default Header
