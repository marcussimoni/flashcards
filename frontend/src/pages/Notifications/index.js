import React, { Component } from 'react';
import OlderFlashcards from '../OlderFlashcards'
import './style.css'

export default class Notifications extends Component {

    render(){
        return (
            <div className="notifications-main">
                <OlderFlashcards></OlderFlashcards>
            </div>
        )
    }

}