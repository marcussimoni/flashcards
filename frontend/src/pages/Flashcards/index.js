import React, { Component } from "react";
import FlashcardService from "./service";
import { faGrinWink, faMeh, faGrinBeamSweat, faArrowAltCircleLeft, faArrowCircleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import PubSub from 'pubsub-js'
import ReactTooltip from "react-tooltip";
import './styles.css'

const [EASY, MEDIUM, HARD] = [1,2,3]

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
            this.setState({flashcards: data, startedAt: new Date(), flashcard: {...data[0], visible: true}})
        })
    }

    flipCard = (selectedFlashcard) => {
        this.setState({flashcard: {...selectedFlashcard, flipped: true}})
    }

    hide = (selectedFlashcard, difficulty) => {
        
        const flashcards = this.state.flashcards.map(flashcard => {
            if(selectedFlashcard.id === flashcard.id){
                let visible = false

                return {...flashcard, visible, difficulty, timesCardShowUp: ++this.state.timesCardShowUp}
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
            <div className="sided-bar">
                <p><label>Flashcards:</label> {flashcards.length - visible}</p>
                <p><label>Flipped cards:</label> {visible}</p>
                <p><label>Marked as easy:</label> {markedAsEasy}</p>
                <p><label>Marked as medium:</label> {markedAsMedium}</p>
                <p><label>Marked as hard:</label> {markedAsHard}</p>
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

    moveToNext = (item) => {
        const flashcards = this.state.flashcards;
        const index = flashcards.findIndex(i => i.id === item.id)
        const flashcard = flashcards[index + 1]

        if(flashcard){
            this.setState({flashcard})
        }
    }

    moveToPrevious = (item) => {
        const flashcards = this.state.flashcards;
        const index = flashcards.findIndex(i => i.id === item.id)
        const flashcard = flashcards[index - 1]
        
        if(flashcard){
            this.setState({flashcard})
        }
    }

    showFlashcard = (item) => {

        if(!item){
            return "";
        }

        return (
            <div className="row">

                <ReactTooltip id="tooltip-top" delayShow="300" place="top" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-right" delayShow="300" place="right" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-left" delayShow="300" place="left" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-bottom" delayShow="300" place="bottom" type="dark" effect="float"/>

                <div style={{display: 'flex', alignItems: 'center'}}>

                    <div className="arrow" data-for="tooltip-left" data-tip="Move to previous card" onClick={() => this.moveToPrevious(item)}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </div>

                    <div className="flashcard">
                        {
                            item.flipped 
                            ? 
                            <div key={item.id} className="flashcard" id={item.id}>
                                <span className="flashcardContentBack">{ item.answer }</span>
                                <div className="flashcardsButtons">
                                    
                                    <span data-for="easy" data-tip={this.toolTip('an easy')} className="easy-button" key={'easy'} onClick={() => this.hide(item, '1')}><FontAwesomeIcon icon={faGrinWink}/></span>
                                    <span data-for="medium" data-tip={this.toolTip('a medium')} className="medium-button" key={'normal'} onClick={() => this.hide(item, '2')}><FontAwesomeIcon icon={faMeh}/></span>
                                    <span data-for="hard" data-tip={this.toolTip('a hard')} className="hard-button" key={'hard'} onClick={() => this.hide(item, '3')}><FontAwesomeIcon icon={faGrinBeamSweat}/></span>

                                    <ReactTooltip id="easy" delayShow="300" place="left" type="dark" effect="float"/>
                                    <ReactTooltip id="medium" delayShow="300" place="bottom" type="dark" effect="float"/>
                                    <ReactTooltip id="hard" delayShow="300" place="right" type="dark" effect="float"/>

                                </div>
                            </div>
                            :
                            <div key={item.id} className="flashcard" onClick={() => this.flipCard(item)} data-for="tooltip-top" data-tip="Click to flip flashcard">
                                <span className="flashcardContent">{ item.question }</span>
                            </div>
                        }
                    </div>    

                    <div className="arrow" data-for="tooltip-right" data-tip="Move to next card" onClick={() => this.moveToNext(item)}>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                    </div>
                </div>


            </div>
                    
        )
    }
 
    render(){
        return (
            <>
                <div className="flex-container">
                    {this.state.redirect ? <Redirect to={`test-result/${this.state.testResultId}`}></Redirect> : null}
                    
                    {
                        this.state.flashcards.length > 0 ? this.sidedPanel() : null
                    }
                    
                    {this.showFlashcard(this.state.flashcard)}                                       
                    
                </div>
            </>
        )
    }
       
}