import React from "react"
import Menu from "../Menu"
import Notifications from "../Notifications"
import {HeaderMain, HeaderMenu, HeaderContent, HeaderNotifications} from './style.js'
import { isAuthenticated } from "../../services/auth";

const Header = (props) => (
    
    isAuthenticated() 
    ?
        <HeaderMain>
            <HeaderMenu>
                <Menu></Menu>
            </HeaderMenu>
            <HeaderContent>
                {props.children}
            </HeaderContent>
            <HeaderNotifications>
                <Notifications></Notifications>
            </HeaderNotifications>
        </HeaderMain>
    : 
        null
)

export default Header
