import React from "react"
import Menu from "../Menu"
import Notifications from "../Notifications"
import {Container, HeaderMain, HeaderMenu, HeaderContent, HeaderNotifications} from './style.js'
import { isAuthenticated } from "../../services/auth";
import AutenticatedUser from '../AutenticatedUser'

const Header = (props) => (
    
    isAuthenticated() 
    ?
        <Container>
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
                    <AutenticatedUser></AutenticatedUser>
            </HeaderMain>
        </Container>
    : 
        null
)

export default Header
