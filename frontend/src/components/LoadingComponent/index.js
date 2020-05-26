import ReactLoading from "react-loading";
import React, { Component } from "react";
import PubSub from 'pubsub-js'

export class LoadingComponent extends Component {

    cssStyle = {
        zIndex: '100',
        backgroundColor: '#eee',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        opacity: '0.5',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        top: 0
    }
    
    subscriber = (msg, data) => {
        this.setState({showLoadingComponent: data})
    }
    
    constructor(){
        super()
        this.state = {
            showLoadingComponent: false
        }
    }
    
    componentDidMount(){
        PubSub.subscribe('loading', this.subscriber)
    }

    render(){
        if(this.state.showLoadingComponent) {
            return <div style={this.cssStyle}><ReactLoading type={this.props.type} color={this.props.color} height={'5%'} width={'5%'} /></div>
        } else {
            return <div></div>
        }
    }

}