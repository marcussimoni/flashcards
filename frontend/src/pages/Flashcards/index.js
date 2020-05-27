import React, { Component } from "react";
import FlashcardService from "./service";
import { faGrinWink, faMeh, faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import PubSub from 'pubsub-js'

const container = {
    width: '70%',
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
    width: '180px',
    height: '220px',
    border: '1px solid black',
    borderRadius: '5px',
    boxShadow: '5px 5px 5px #aaa',
    float: 'left',
    fontSize: '28px',
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
    fontSize: '22px',
    whiteSpace: 'normal'
}

const flashcardsButtons = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '0 10px 20px'
}

const sidedBar = {
    position: 'fixed',
    width: '12%',
    height: '300px',
    border: '1px solid #000',
    borderRadius: '5px',
    marginTop: '10px',
    marginLeft: '10px',
    boxShadow: '5px 5px 5px #aaa',
    fontSize: '18px',
    padding: '10px'
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
        PubSub.subscribe('flashcards', (msg, data) => {
            this.setState({flashcards: data})
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

        this.setState({flashcards})

        const cardsLeft = flashcards.filter(card => card.visible)

        if(cardsLeft.length === 0){
            FlashcardService.saveResult(flashcards).then(response => {
                alert('result successful saved')
                this.setState({redirect: true, testResultId: response.data})
            })
        }

    }

    sidedPanel = () => {
        const flashcards = [...this.state.flashcards]
        const visible = flashcards.filter(flashcard => !flashcard.visible).length
        const markedAsEasy = flashcards.filter(flashcard => flashcard.difficulty === '1').length
        const markedAsMedium = flashcards.filter(flashcard => flashcard.difficulty === '2').length
        const markedAsHard = flashcards.filter(flashcard => flashcard.difficulty === '3').length
        return (
            <div style={sidedBar}>
                <p>Flashcards: {flashcards.length - visible}</p>
                <p>Flipped cards: {visible}</p>
                <p>Marked as easy: {markedAsEasy}</p>
                <p>Marked as medium: {markedAsMedium}</p>
                <p>Marked as hard: {markedAsHard}</p>
            </div>
        )
    }

    render(){
        return (
            <>
                {this.state.redirect ? <Redirect to={`test-result/${this.state.testResultId}`}></Redirect> : null}
                
                {
                    this.state.flashcards.length > 0 ? this.sidedPanel() : null
                }
                
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