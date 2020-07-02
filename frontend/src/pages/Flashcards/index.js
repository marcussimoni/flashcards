import React, { Component } from "react";
import FlashcardService from "../../services/FlashcardService";
import { faGrinWink, faMeh, faGrinBeamSweat, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect, Link } from 'react-router-dom'
import PubSub from 'pubsub-js'
import ReactTooltip from "react-tooltip";
import {Flashcard, FlashcardContent, FlashcardsButtons, FlashcardButton, 
        FlashcardFront, FlashcardBack, SidedBar, SidedBarItem, FlexContainer, 
        Arrow, List} from './style'

import DeckService from "../../services/DeckService";

const [MEDIUM, HARD] = ['2','3']

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
            deck: null,
            flashcards: [],
            selectedItens: []
        }
    }

    componentDidMount(){
        PubSub.subscribe('flashcards', (msg, data) => {
            
            FlashcardService.findAll(`/flashcards/deck/${data}`).then(response => {
                const flashcards = response.data.map(flashcard => {
                    return {
                        ...flashcard,
                        flipped: false,
                        visible: true,
                        difficulty: ''
                    }
                })
                this.setState({flashcards: flashcards, startedAt: new Date(), flashcard: {...flashcards[0], visible: true}, deck: data})
            })
        })

        DeckService.findAll().then(response => {
            this.setState({decks: response.data})
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

        if(difficulty === HARD && selectedFlashcard.timesCardShowUp < 4){
            
            this.updateFlashcard(selectedFlashcard, flashcards, difficulty);

        } else if (difficulty === MEDIUM && selectedFlashcard.timesCardShowUp < 2) {

            this.updateFlashcard(selectedFlashcard, flashcards, difficulty);

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
            <SidedBar>
                <p><SidedBarItem>Flashcards:</SidedBarItem> {flashcards.length - visible}</p>
                <p><SidedBarItem>Flipped cards:</SidedBarItem> {visible}</p>
                <p><SidedBarItem>Marked as easy:</SidedBarItem> {markedAsEasy}</p>
                <p><SidedBarItem>Marked as medium:</SidedBarItem> {markedAsMedium}</p>
                <p><SidedBarItem>Marked as hard:</SidedBarItem> {markedAsHard}</p>
            </SidedBar>
        )
    }

    toolTip = (difficulty) => {
        return `Mark this card as ${difficulty} difficulty`
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

    buildLiElement = (item) => {
        const answer = item.answer
        if(!answer){
            return null
        }
        if(answer.indexOf(',') > 0){
            return answer.split(',').map(value => <li>{value}</li>)
        } else {
            return <li>{answer}</li>
        }
    }

    showFlashcard = (item) => {

        if(!item){
            return "";
        }

        return (
            <div className="row">

                <ReactTooltip id="tooltip-top" delayShow={300} place="top" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-right" delayShow={300} place="right" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-left" delayShow={300} place="left" type="dark" effect="float"/>
                <ReactTooltip id="tooltip-bottom" delayShow={300} place="bottom" type="dark" effect="float"/>

                <div style={{display: 'flex', alignItems: 'center'}}>

                    <Arrow data-for="tooltip-left" data-tip="Move to previous card" onClick={() => this.moveToPrevious(item)}>
                        <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                    </Arrow>

                    {
                        item.flipped 
                        ? 
                        <Flashcard key={item.id} id={item.id}>
                            <div>
                                <FlashcardFront>{ item.question }</FlashcardFront>
                                <FlashcardBack>
                                    <List>
                                        { this.buildLiElement(item) }
                                    </List>
                                </FlashcardBack>
                                <FlashcardsButtons className="flashcardsButtons">
                                    
                                    <FlashcardButton data-for="easy" data-tip={this.toolTip('an easy')} type="easy" key={'easy'} onClick={() => this.setDifficulty(item, '1')}><FontAwesomeIcon icon={faGrinWink}/></FlashcardButton>
                                    <FlashcardButton data-for="medium" data-tip={this.toolTip('a medium')} type="medium" key={'normal'} onClick={() => this.setDifficulty(item, '2')}><FontAwesomeIcon icon={faMeh}/></FlashcardButton>
                                    <FlashcardButton data-for="hard" data-tip={this.toolTip('a hard')} type="hard" key={'hard'} onClick={() => this.setDifficulty(item, '3')}><FontAwesomeIcon icon={faGrinBeamSweat}/></FlashcardButton>

                                    <ReactTooltip id="easy" delayShow={300} place="left" type="dark" effect="float"/>
                                    <ReactTooltip id="medium" delayShow={300} place="bottom" type="dark" effect="float"/>
                                    <ReactTooltip id="hard" delayShow={300} place="right" type="dark" effect="float"/>

                                </FlashcardsButtons>
                            </div>
                        </Flashcard>
                        :
                        <Flashcard key={item.id} onClick={() => this.flipCard(item)} data-for="tooltip-top" data-tip="Click to flip flashcard">
                            <FlashcardContent>{ item.question }</FlashcardContent>
                        </Flashcard>
                    } 

                    <Arrow data-for="tooltip-right" data-tip="Move to next card" onClick={() => this.moveToNext(item)}>
                        <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                    </Arrow>
                </div>

            </div>
                    
        )
    }
 
    updateFlashcard(selectedFlashcard, flashcards, difficulty) {
        selectedFlashcard.timesCardShowUp++;
        selectedFlashcard.difficulty = difficulty;
        const index = this.getIndex(flashcards, selectedFlashcard);
        flashcards.splice(index, 1);
        flashcards.push(selectedFlashcard);
    }

    render(){
        let content = null
        const totalFlashcards = this.state.flashcards.length
        if(totalFlashcards > 0){
            content = (
                <FlexContainer>
                    {this.state.redirect ? <Redirect to={`test-result`}></Redirect> : null}    
                    
                    {this.sidedPanel()}
                    
                    {this.showFlashcard(this.state.flashcard)}
                </FlexContainer>
            )
        } else if (this.state.decks.length === 0) {
            content = <div className="alert alert-primary">
                    You don't have any deck with flashcards created. Click <Link to="deck">here </Link> 
                    to create a new deck and add some flashcards.
                </div>
        } else if (this.state.deck && totalFlashcards === 0) {
            content = <div className="alert alert-primary">The deck selected is empty. You can add some flashcards clicking <Link to="deck">here</Link> </div>
        }

        return <div className="container text-center">{content}</div>
    }
       
}