import React, { Component } from 'react'
import FlashcardService from '../../services/FlashcardService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faComment, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ModalComponent from '../../components/ModalComponent'
import {IconStyles, IconCounter, FloatButton, FlashcardItens} from './style.js'

export default class OlderFlashcards extends Component {
   
    constructor(){
        super()
        this.state = {
            showModal: false,
            flashcards: [],
        }
    }

    componentDidMount(){
        this.findAllOlderThan()
    }

    findAllOlderThan() {
        FlashcardService.findAllOlderThan().then(response => {
            if (response.status === 200) {
                this.setState({ flashcards: response.data })
            }
        })
    }

    checkOlderFlashcards = () => {
        this.setState({showModal: true})
    }

    selectFlashcard = (selectedFlashcard, checked) => {
        
        const flashcards = [...this.state.flashcards].map(item => {
            
            item.flashcards = item.flashcards.map(flashcard => {
                if(flashcard.id === selectedFlashcard.id){
                    return {...selectedFlashcard, checked}
                } else {
                    return flashcard
                }
            })
            return item
        })
        
        this.setState({flashcards})

    }

    selectDeck = (deck, checked) => {
        const flashcards = this.state.flashcards.map(item => {
            if(item.deck.id === deck.id){
                item.deck.checked = checked
                item.flashcards = item.flashcards.map(flashcard => { return {...flashcard, checked}});
            }
            return item;
        })

        this.setState(state => {
            return { ...state, flashcards }
        }, () => console.log('flashcards => ', this.state.flashcards))
    }

    getTotalFlashcards = () => {
        const flashcards = this.state.flashcards;
        
        if(flashcards.length > 0){
            return flashcards.map(item => item.flashcards.length).reduce((x, y) => x += y)
        } else {
            return 0
        }
    }

    removeOldFlashcards = () => {
        FlashcardService.removeOldFlashcards(this.state.flashcards).then(response => {
            if(response.status === 200){
                this.findAllOlderThan()
                alert('Flashcards successful updated')
                this.setState({showModal: false})
            }
        })
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    render(){
        return (
            <>
                <IconStyles>
                    {
                        this.getTotalFlashcards() > 0
                        ? 
                        <div data-tip="Check older flashcard" onClick={this.checkOlderFlashcards}>
                            <IconCounter className="icon-counter">{this.getTotalFlashcards()}</IconCounter>
                            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                            <ReactTooltip delayShow="300" place="left" type="dark" effect="float"></ReactTooltip>
                        </div>
                        : null
                    }
                </IconStyles>
                {
                    this.state.showModal ?
                    <ModalComponent>    
                        <div>
                            <h6 className="text-center"> flashcards older than 7 days</h6>
                        </div>
                        {
                            this.state.flashcards.map(item => {
                                return (
                                    <ul>
                                        <li key={item.deck.id}>
                                            <FlashcardItens id={`deck-${item.deck.id}`} type="checkbox" checked={item.checked} 
                                                            onClick={(event) => this.selectDeck(item.deck, event.target.checked)}/>
                                            <label for={`deck-${item.deck.id}`}>{item.deck.name}</label>
                                        </li>
                                        <ul>
                                            {
                                                item.flashcards.map(flashcard => {
                                                    return (
                                                        <li key={flashcard.id}>
                                                            <FlashcardItens id={`flashcard-${flashcard.id}`} checked={flashcard.checked} style={{marginLeft: '20px'}}
                                                                            type="checkbox" onClick={(event) => this.selectFlashcard(flashcard, event.target.checked)}/>
                                                            <label for={`flashcard-${flashcard.id}`}>{flashcard.question}</label>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </ul>
                                )
                            })
                        }
                        <FloatButton>
                            <button className="btn btn-danger" onClick={this.removeOldFlashcards} data-tip="Remove old flashcards" data-for="float-buttons">
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                            <button className="btn btn-primary" onClick={this.closeModal} data-tip="Close modal" data-for="float-buttons">
                                <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                            </button>
                            <ReactTooltip id="float-buttons" delayShow="100" place="top" type="dark" effect="float"></ReactTooltip>
                        </FloatButton>
                    </ModalComponent> : null
                }
            </>
        )
    }

}
