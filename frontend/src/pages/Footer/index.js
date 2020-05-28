import React, { Component } from "react";
import api from "../../services/api";
import PubSub from 'pubsub-js'
import './style.css'

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
            <div className="main">
                <div className="container">
                    <div className="action-buttons">
                        <button className="btn-circle btn-danger " onClick={this.deleteItens}><i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        )
    }

}