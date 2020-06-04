import ReactLoading from "react-loading";
import React, { Component } from "react";
import PubSub from 'pubsub-js'
import styled from 'styled-components'

const Loading = styled.div`
    z-index: 100;
    background-color: #eee;
    position: fixed;
    display: flex;
    justify-content: center;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    align-items: center;
    top: 0;
`

export class LoadingComponent extends Component {
  
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
            return <Loading><ReactLoading type={this.props.type} color={this.props.color} height={'5%'} width={'5%'} /></Loading>
        } else {
            return <div></div>
        }
    }

}