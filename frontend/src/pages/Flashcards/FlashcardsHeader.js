import React, { Component } from "react";
import DeckService from "../../services/DeckService";
import PubSub from 'pubsub-js'
import styled from 'styled-components'
import ComboBoxComponent from "../../components/ComboBoxComponent";

const FlashcardsContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    padding: 10px;
    display: flex; 
    justify-content: center;
    align-items: 'center';
` 

export default class FlashcardsHeader extends Component {
    
    constructor(){
        super()
        this.state = {
            decks: []
        }
    }

    componentDidMount(){
        DeckService.findAll().then(response => this.setState({decks: response.data}))
    }

    fetchCards = (deck) => {
        this.setState({deck})
        if(deck){
            PubSub.publish('flashcards', deck)
        } else {
            PubSub.publish('flashcards', null)
        }
    }    

    render(){
        return (
            <FlashcardsContainer>
                <ComboBoxComponent defaultItem="Select deck to start study" data={this.state.decks} keyValue="id" 
                value="name" selectedValue="id" onChange={this.fetchCards}></ComboBoxComponent>
            </FlashcardsContainer>
        )
    }
}