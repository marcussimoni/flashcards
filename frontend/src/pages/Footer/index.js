import React, { Component } from "react";
import api from "../../services/api";
import PubSub from 'pubsub-js'

const main = {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)'
}

const actionButtons = {
    float: 'right',
    marginBottom: '5px'
}

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
            <div style={main}>
                <div className="container">
                    <div style={actionButtons}>
                        <button className="btn-circle btn-danger " onClick={this.deleteItens}><i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        )
    }

}