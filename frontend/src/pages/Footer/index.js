import React, { Component } from "react";
import api from "../../services/api";
import PubSub from 'pubsub-js'
import {Main, ActionButtons} from './style.js'
import ReactTooltip from "react-tooltip";

export default class Footer extends Component {

    selectedItens = []

    componentDidMount(){
        PubSub.subscribe('add-items', this.addItems)
    }

    addItems = (msg, data) => {
        this.selectedItens = data
    }

    deleteItens = () => {
        if(this.selectedItens.length === 0){
            return
        }
        api.delete('/flashcards', { data: this.selectedItens }).then(response => {
            PubSub.publish('refresh-listing', true)
            this.selectedItens = []
        }).catch(error => {
            console.log('error => ', error)
        })
    }

    render(){
        return (
            <Main>
                <div className="container">
                    <ActionButtons>
                        <ReactTooltip id="remove" place="left" type="dark" effect="float"/>
                        <button data-for="remove" data-tip="Remove selected flashcards" className="btn-circle btn-danger " 
                                onClick={this.deleteItens}><i className="fa fa-trash"></i></button>
                    </ActionButtons>
                </div>
            </Main>
        )
    }

}