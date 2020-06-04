import React, { Component } from "react";
import DeckService from "../../services/DeckService";
import FlashcardService from "../../services/FlashcardService";
import PubSub from 'pubsub-js'
import styled from 'styled-components'

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
                <select className="form-control col-md-4" onChange={deck => this.fetchCards(deck.target.value)}>
                    <option>Select deck</option>
                    {this.state.decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
                </select>
            </FlashcardsContainer>
        )
    }
}