import React, { Component } from "react";
import DeckService from "../Deck/service";
import FlashcardService from "./service";
import { faGrinWink, faMeh, faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'

const container = {
    width: '80%',
    margin: '0 auto',
    padding: '10px',
}

const flashcardsContainer = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
    gridGap: '20px 0px',
    overflow: 'visible'
}

const flashcard = {
    position: 'relative',
    width: '120px',
    height: '150px',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '5px 5px 5px #aaa',
    float: 'left',
    fontSize: '20px',
    backgroundColor: '#4f5d75',
    fontStyle: 'italic',
    color: '#fff',
    cursor: 'pointer'
}

const flashcardContent = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%'
}

const flashcardContentBack = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    fontStyle: 'normal',
    fontSize: '16px',
    whiteSpace: 'normal'
}

const flashcardsButtons = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '0 10px 20px'
}

export class Flashcards extends Component {
        
    constructor(props){
        super(props)
        this.state = {
            testResultId: 0,
            redirect: false,
            decks: [],
            flashcards: [],
            selectedItens: []
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
            this.setState({flashcards})
        })
    }

    flipCard = (selectedFlashcard) => {
        const flashcards = this.state.flashcards.map(flashcard => {
            if(selectedFlashcard.id === flashcard.id){
                return {...flashcard, flipped: true}
            } else {
                return flashcard;
            }
        })
        this.setState({flashcards})
    }

    hide = (selectedFlashcard, difficulty) => {
        const flashcards = this.state.flashcards.map(flashcard => {
            if(selectedFlashcard.id === flashcard.id){
                return {...flashcard, visible: false, difficulty}
            } else {
                return {...flashcard}
            }
        })

        document.getElementById(selectedFlashcard.id).style = `
        
            opacity: 0;

            position: 'relative',
            width: '120px',
            height: '150px',
            border: '1px solid black',
            border-radius: '5px',
            box-shadow: '5px 5px 5px #aaa',
            float: 'left',
            font-size: '20px',
            background: '#4f5d75',
            font-style: 'italic',
            color: '#fff',
            cursor: 'pointer'

            -webkit-transition: opacity 1s ease-in-out;
            -moz-transition: opacity 1s ease-in-out;
            -ms-transition: opacity 1s ease-in-out;
            transition: opacity 1s ease-in-out;
        `

        

        setTimeout(()=>{
            this.setState({flashcards})

            const cardsLeft = flashcards.filter(card => card.visible)

            if(cardsLeft.length === 0){
                FlashcardService.saveResult(flashcards).then(response => {
                    alert('result successful saved')
                    this.setState({redirect: true, testResultId: response.data})
                })
            }

        }, 1500)

    }

    render(){
        return (
            <>
            {this.state.redirect ? <Redirect to={`test-result/${this.state.testResultId}`}></Redirect> : null}
            
                <select className="form-control col-md-4" onChange={deck => this.fetchCards(deck.target.value)}>
                    <option>Select deck</option>
                    {this.state.decks.map(deck => <option key={deck.id} value={deck.id}>{deck.name}</option>)}
                </select>
            
            <div style={container}>
                <div style={flashcardsContainer}>
                    {this.state.flashcards.filter(item => item.visible === true).map(item => {
                        return (
                            <>
                                {
                                    item.flipped 
                                    ? 
                                    <div key={item.id} style={flashcard} id={item.id}>
                                        <span style={flashcardContentBack}>{ item.answer }</span>
                                        <div style={flashcardsButtons}>
                                            <span key={'easy'} onClick={() => this.hide(item, '1')}><FontAwesomeIcon icon={faGrinWink}/></span>
                                            <span key={'normal'} onClick={() => this.hide(item, '2')}><FontAwesomeIcon icon={faMeh}/></span>
                                            <span key={'hard'} onClick={() => this.hide(item, '3')}><FontAwesomeIcon icon={faGrinBeamSweat}/></span>
                                        </div>
                                    </div>
                                    :
                                    <div key={item.id} style={flashcard} onClick={() => this.flipCard(item)}>
                                        <span style={flashcardContent}>{ item.question }</span>
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>           
            </div>
            </>
        )
    }
       
}