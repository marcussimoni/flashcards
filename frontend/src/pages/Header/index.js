import React from "react"
import Menu from "../Menu"
import Notifications from "../Notifications"
import {HeaderMain, HeaderMenu, HeaderContent, HeaderNotifications} from './style.js'

const Header = (props) => (
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
)

export default Header
