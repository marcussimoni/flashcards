import React, { Component } from 'react'
import FlashcardService from '../../services/FlashcardService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faComment, faTrash, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import './style.css'
import ReactTooltip from 'react-tooltip'
import ModalComponent from '../../components/ModalComponent'

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
            return {flashcards}
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
            }
        })
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    render(){
        return (
            <>
                <div className="icon-styles">
                    {
                        this.getTotalFlashcards() > 0
                        ? 
                        <div data-tip="Check older flashcard" onClick={this.checkOlderFlashcards}>
                            <span className="icon-counter">{this.getTotalFlashcards()}</span>
                            <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                            <ReactTooltip delayShow="300" place="left" type="dark" effect="float"></ReactTooltip>
                        </div>
                        : null
                    }
                </div>
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
                                            <input id={`deck-${item.deck.id}`} type="checkbox" className="flashcard-itens"
                                                   onClick={(event) => this.selectDeck(item.deck, event.target.checked)} checked={item.checked}/>
                                            <label for={`deck-${item.deck.id}`}>{item.deck.name}</label>
                                        </li>
                                        <ul>
                                            {
                                                item.flashcards.map(flashcard => {
                                                    return (
                                                        <li key={flashcard.id}>
                                                            <input id={`flashcard-${flashcard.id}`} className="flashcard-itens"
                                                                   checked={flashcard.checked}
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
                        <div className="float-button">
                            <button className="btn btn-danger" onClick={this.removeOldFlashcards}>
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>
                            <button className="btn btn-primary" onClick={this.closeModal}>
                                <FontAwesomeIcon icon={faWindowClose}></FontAwesomeIcon>
                            </button>
                        </div>
                    </ModalComponent> : null
                }
            </>
        )
    }

}
