import React, { Component } from "react";
import api from "../../services/api";
import PubSub from 'pubsub-js'
import {Main, ActionButtons} from './style.js'

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
        api.delete('/question', { data: this.selectedItens }).then(response => {
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
                        <button className="btn-circle btn-danger " onClick={this.deleteItens}><i className="fa fa-trash"></i></button>
                    </ActionButtons>
                </div>
            </Main>
        )
    }

}