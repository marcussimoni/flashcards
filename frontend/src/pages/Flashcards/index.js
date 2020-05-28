import React, { Component } from "react";
import FlashcardService from "./service";
import { faGrinWink, faMeh, faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import PubSub from 'pubsub-js'
import ReactTooltip from "react-tooltip";
import './styles.css'

export class Flashcards extends Component {
        
    constructor(props){
        super(props)
        this.state = {
            timer: {
                started: false,
                time: 0
            },
            startedAt: {},
            testResultId: 0,
            redirect: false,
            decks: [],
            flashcards: [],
            selectedItens: []
        }
    }

    componentDidMount(){
        PubSub.subscribe('flashcards', (msg, data) => {
            this.setState({flashcards: data, startedAt: new Date()})
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
            <div className="sidedBar">
                <p>Flashcards: {flashcards.length - visible}</p>
                <p>Flipped cards: {visible}</p>
                <p>Marked as easy: {markedAsEasy}</p>
                <p>Marked as medium: {markedAsMedium}</p>
                <p>Marked as hard: {markedAsHard}</p>
            </div>
        )
    }

    toolTip = (difficulty) => {
        return `Mark this card as ${difficulty} difficulty`
    }

    seconds = 0;

    startTimer = () => {
        if(this.state.flashcards.length > 0){
            return setInterval(() => {
                return <div style={{position: 'fixed', right: '0', width: '100px'}}>{++this.seconds}</div>
            }, 1000);
        }
    }
 
    render(){
        return (
            <>
                {this.state.redirect ? <Redirect to={`test-result/${this.state.testResultId}`}></Redirect> : null}
                
                {
                    this.state.flashcards.length > 0 ? this.sidedPanel() : null
                }

                <div className="container">
                    <div className="flashcardsContainer">
                        {this.state.flashcards.filter(item => item.visible === true).map(item => {
                            return (
                                <>
                                    {
                                        item.flipped 
                                        ? 
                                        <div key={item.id} className="flashcard" id={item.id}>
                                            <span className="flashcardContentBack">{ item.answer }</span>
                                            <div className="flashcardsButtons">
                                                
                                                <span data-tip={this.toolTip('an easy')} className="easy-button" key={'easy'} onClick={() => this.hide(item, '1')}><FontAwesomeIcon icon={faGrinWink}/></span>
                                                <span data-tip={this.toolTip('a medium')} className="medium-button" key={'normal'} onClick={() => this.hide(item, '2')}><FontAwesomeIcon icon={faMeh}/></span>
                                                <span data-tip={this.toolTip('a hard')} className="hard-button" key={'hard'} onClick={() => this.hide(item, '3')}><FontAwesomeIcon icon={faGrinBeamSweat}/></span>
                                                
                                                <ReactTooltip place="top" type="dark" effect="float"/>
                                            </div>
                                        </div>
                                        :
                                        <div key={item.id} className="flashcard" onClick={() => this.flipCard(item)}>
                                            <span className="flashcardContent">{ item.question }</span>
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