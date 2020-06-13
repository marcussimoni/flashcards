import React, { Component } from "react";
import PubSub from 'pubsub-js'
import api from "../../services/api";
import {FlexContent} from './style.js'

export default class NewCard extends Component {

    constructor(){
        super()
        this.state = {
            question: '',
            answer: '',
            deck: 0
        }
        window.onfocus = () => {
            this.setFocusOnInputQuestion()
        }
    }

    componentDidMount(){
        this.setShortCuts()
        this.subscribe()
    }

    subscribe = () => {
        PubSub.subscribe('deck', (msg, data) => {
            this.setState({deck: data})
        })
    }

    translate = () => {
        const question = {
            question: this.state.question,
            answer: this.state.answer,
            deck: {
                id: this.state.deck
            }
        }
        
        api.post('/question', question).then(resp => {
            PubSub.publish('refresh-listing', resp)
            this.clearInputText();
            this.setFocusOnInputQuestion()
            setTimeout(() => {
                this.scrollToElement(resp.data.id)
            }, 100)
        }).catch(error => {
            console.log('error => ', error)
            const message = {
                type: 'alert-danger', text: error.data.message
            }
            PubSub.publish('show-message', message)
        })
    
    }

    setFocusOnInputQuestion = () => {
        const question = document.getElementById('input-question')
        
        if(!question){
            return
        }

        if(!question.value){
            question.focus()
        } else {
            document.getElementById('input-answer').focus()
        }
    }
    
    setQuestion = (event) => {
        this.setState({question: event.target.value})
    }

    setAnswer = (event) => {
        this.setState({answer: event.target.value})
    }
    
    setShortCuts = () => {

        //study a form to decouple this function
        window.onkeypress = (event) => {
            const ENTER = 13;
            
            if(event.keyCode === ENTER){
                this.translate()
            }

        }
    }

    searchWord = () => {
        const question = this.state.question

        if(!question){
            return
        }

        api.get(`question/deck/3/question/${question}`).then(response => {
            this.clearInputText()
            this.setFocusOnInputQuestion()
            this.scrollToElement(response.data.id)
        })
    }
    
    scrollToElement = (id) => {
        const element = document.getElementById(id)
        if(element){
            element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
    }

    clearInputText() {
        this.setState({ question: '', answer: '' });
    }

    render(){
        return (
            <FlexContent>
                <div className="input-group">
                    <input autoFocus id="input-question" className="form-control" type="text" 
                           placeholder="Front flashcard" onChange={this.setQuestion} 
                           onBlur={this.searchWord} value={this.state.question} autocomplete="off"/>
                    <input id="input-answer" className="form-control" 
                           type="text" placeholder="Back flashcard" 
                           onChange={this.setAnswer} value={this.state.answer}
                           autocomplete="off"/>
                    <div className="input-group-append">
                        <button className="btn btn-info" onClick={this.translate}>save</button>
                    </div>
                </div>
            </FlexContent>
        )
    }

}