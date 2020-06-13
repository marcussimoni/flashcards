import React, {Component} from 'react'
import { AutenticatedUserContent, AutenticatedUserName, AutenticatedUserLogout } from './style'
import {logout} from '../../services/auth'
import UserService from '../../services/UserService'
import ReactTooltip from "react-tooltip";

export default class AutenticatedUser extends Component {
    
    constructor(){
        super()
        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        UserService.authenticatedUser().then(response => {
            this.setState({user: response.data})
        })
    }

    logginout = () => {
        logout()
        window.location = '/'
    }

    getUsername = () => {
        const user = this.state.user
        return `${user.firstName} ${user.lastName}`
    }

    render(){
        return (
            <AutenticatedUserContent>
                <AutenticatedUserName>{this.getUsername()}</AutenticatedUserName>
                <AutenticatedUserLogout onClick={this.logginout} data-for="logout" data-tip="Logout session">Logout</AutenticatedUserLogout>
                <ReactTooltip id="logout" delayShow="300" place="left" type="dark" effect="float"/>
            </AutenticatedUserContent>
        )
    }

}