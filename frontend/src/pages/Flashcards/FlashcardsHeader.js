import React, { Component } from "react";
import DeckService from "../../services/DeckService";
import FlashcardService from "../../services/FlashcardService";
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
    	FlashcardService.findAll(`/question/deck/${deck}`).then(response => {
            const flashcards = response.data.map(flashcard => {
                return {
                    ...flashcard,
                    flipped: false,
                    visible: true,
                    difficulty: ''
                }
            })

            PubSub.publish('flashcards', flashcards)
        })
    }    

    render(){
        return (
            <FlashcardsContainer>
                <ComboBoxComponent data={this.state.decks} keyValue="id" value="name" selectedValue="id" onChange={this.fetchCards}></ComboBoxComponent>
            </FlashcardsContainer>
        )
    }
}