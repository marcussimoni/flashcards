import React, { Component } from "react";
import FlashcardService from "../../services/FlashcardService";
import { faGrinWink, faMeh, faGrinBeamSweat, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import PubSub from 'pubsub-js'
import ReactTooltip from "react-tooltip";
import './style.css'

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

        document.onkeydown = (event) => {
            const keyCode = event.keyCode;
            if(keyCode === 37){
                this.moveToPrevious(this.state.flashcard)
            } else if (keyCode === 39) {
                this.moveToNext(this.state.flashcard)
            } else if (keyCode === 38) {
                this.flipCard(this.state.flashcard)
            }
        }
    }

    flipCard = (selectedFlashcard) => {
        this.setState({flashcard: {...selectedFlashcard, flipped: true}})
    }

    setDifficulty = (selectedFlashcard, difficulty) => {
        
        let flashcards = [...this.state.flashcards]

        selectedFlashcard.flipped = false

        if(difficulty == HARD && selectedFlashcard.timesCardShowUp < 4){
            
            this.updateFlashcard(selectedFlashcard, flashcards);

        } else if (difficulty == MEDIUM && selectedFlashcard.timesCardShowUp < 2) {

            this.updateFlashcard(selectedFlashcard, flashcards);

        } else {

            flashcards = this.state.flashcards.map(flashcard => {
                if(selectedFlashcard.id === flashcard.id){
                    let visible = false
                    let timesCardShowUp = this.state.timesCardShowUp
                    return {...flashcard, visible, difficulty, timesCardShowUp: ++timesCardShowUp}
                } else {
                    return {...flashcard}
                }
            })

        }

        this.setState({flashcards})

        const cardsLeft = flashcards.filter(card => card.visible)

        if(cardsLeft.length === 0){
            FlashcardService.saveResult(flashcards).then(response => {
                alert('result successful saved')
                this.setState({redirect: true, testResultId: response.data})
            })
        }

        this.moveToNext(selectedFlashcard)

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
        return null
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
        const flashcards = this.getVisibleFlashcards()
        const index = this.getIndex(flashcards, item)
        const flashcard = flashcards[index + 1]

        if(flashcard){
            this.setState({flashcard})
        } else if (flashcards.length > 0) {
            this.setState({flashcard: flashcards[0]})
        }
    }

    moveToPrevious = (item) => {
        const flashcards = this.getVisibleFlashcards()
        const index = this.getIndex(flashcards, item)
        const flashcard = flashcards[index - 1]
        
        if(flashcard){
            this.setState({flashcard})
        } 
    }

    getIndex = (flashcards, item) => {
        return flashcards.findIndex(i => i.id === item.id)
    }

    getVisibleFlashcards = () => {
        return this.state.flashcards.filter(flashcard => flashcard.visible);
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
                                    
                                    <span data-for="easy" data-tip={this.toolTip('an easy')} className="easy-button" key={'easy'} onClick={() => this.setDifficulty(item, '1')}><FontAwesomeIcon icon={faGrinWink}/></span>
                                    <span data-for="medium" data-tip={this.toolTip('a medium')} className="medium-button" key={'normal'} onClick={() => this.setDifficulty(item, '2')}><FontAwesomeIcon icon={faMeh}/></span>
                                    <span data-for="hard" data-tip={this.toolTip('a hard')} className="hard-button" key={'hard'} onClick={() => this.setDifficulty(item, '3')}><FontAwesomeIcon icon={faGrinBeamSweat}/></span>

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
 
    updateFlashcard(selectedFlashcard, flashcards) {
        selectedFlashcard.timesCardShowUp++;
        selectedFlashcard.difficulty = HARD;
        const index = this.getIndex(flashcards, selectedFlashcard);
        flashcards.splice(index, 1);
        flashcards.push(selectedFlashcard);
    }

    render(){
        const showSidePanel = this.state.flashcards.length > 0
        return (
            <div className="flex-container">
                {this.state.redirect ? <Redirect to={`test-result`}></Redirect> : null}
                
                { showSidePanel ? this.sidedPanel() : null }
                
                {this.showFlashcard(this.state.flashcard)}                                       
                
            </div>
        )
    }
       
}