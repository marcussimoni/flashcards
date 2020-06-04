import React, { Component } from 'react';
import OlderFlashcards from '../OlderFlashcards'
import {NotificationsMain} from './style.js'

export default class Notifications extends Component {

    render(){
        return (
            <NotificationsMain>
                <OlderFlashcards></OlderFlashcards>
            </NotificationsMain>
        )
    }

}