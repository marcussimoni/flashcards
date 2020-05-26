import React, { Component } from "react"
import PubSub from 'pubsub-js'

export class MessageComponent extends Component {

    constructor(){
        super()
        this.state = {
            showMessage: false,
            type: '',
            title: 'Error while translating',
            message: ''
        }
    }

    componentDidMount(){
        PubSub.subscribe('show-message', (msg, data) => {
            this.setState({...this.state, ...data, showMessage: true})
        })
    }

    dialog = {
        display: 'block',
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        left: 0,
        top: 0
    }

    header = {
        height: '30px',
        width: '100%',
        fontSize: '24px',
        fontWeight: 'bold'
    }

    footer = {
        height: '30px',
        width: '100%',
    }

    body = {
        height: '60px',
        width: '100%',
        fontSize: '18px'
    }

    content = {
        position: 'relative',
        width: '400px',
        height: '200px',
        backgroundColor: '#ffffff',
        top: '30%',
        margin: '0 auto',
        border: '1px solid #2d3142',
        opacity: 1,
        borderRadius: '10px'
    }

    alignCenter = {display: 'flex', justifyContent: 'center', alignItems: 'center'}

    close = () => {
        this.setState({showMessage: false})
    }

    render(){
        return this.state.showMessage ? 
                <div style={this.dialog} >
                    <div style={this.content}>
                        
                        <div style={this.header}>
                            <p style={this.alignCenter}>{this.state.title}asdfsdfasdf</p>
                        </div>
                        
                        <hr/>

                        <div style={this.body}>
                            <p style={this.alignCenter}>
                                {this.state.text}
                            </p>
                        </div>

                        <hr/>

                        <div style={this.footer}>
                            <div style={this.alignCenter}>
                                <button className="btn btn-danger" onClick={this.close}>close</button>
                            </div>
                        </div>

                    </div>
                </div> 
                : <div></div>
    }

}