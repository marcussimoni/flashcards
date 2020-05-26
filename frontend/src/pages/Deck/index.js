import React, { Component } from "react";
import TableComponent from "../../components/TableComponent";
import PubSub from 'pubsub-js'
import FlashcardService from "../Flashcards/service";
import DeckService from "./service";
import Footer from "../Footer";

const  deckSelection = {
    fontSize: '14px',
    marginLeft: '5%'
}

const orderDescription = {
    position: 'relative',
    fontSize: '14px',
    fontStyle: 'italic',
    paddingTop: '8px',
    marginLeft: '55%'
}

export class Deck extends Component {

    constructor(props){
        super(props)
        this.state = {
            decks: [],
            data: [],
            value: '',
            message: {
                type: '',
                text: ''
            }, 
            deck: 0,
            urlConfig: {}
        }

        window.onkeydown = (event) => {
            const LETTER_T = 84
            const CTRL_ALT_PRESSED = event.ctrlKey && event.altKey
            if(CTRL_ALT_PRESSED && event.keyCode === LETTER_T){
                const urlConfig = this.state.urlConfig();
                
                if(urlConfig.url === this.orderByQuestion().url){
                    this.setState({urlConfig: this.orderByTimeStamp})
                } else {
                    this.setState({urlConfig: this.orderByQuestion})
                }

                this.findAll(urlConfig.url)
            }
        }
    }

    orderByQuestion = () => {
        return {
            description: 'Ordered by question',
            url: `/question/deck/${this.state.deck}`
        }
    }

    orderByTimeStamp = () => {
        return {
            description: 'Ordered by question',
            url: `/question/deck/${this.state.deck}?sort=timeStamp,DESC`
        }
    }

    subscribe = (msg, data) => {
        this.findAll()
    }

    componentWillMount(){
        this.setState({urlConfig: this.orderByQuestion})
    }

    componentDidMount = () => {
        this.findAllDecks()
        PubSub.subscribe('refresh-listing', this.subscribe)
    }

    findAllDecks = () => {
        DeckService.findAll().then(response => {
            this.setState({decks: response.data})
        })
    }

    findAll = () => {
        FlashcardService.findAll(this.state.urlConfig().url).then(resp => {
            this.setState({data: resp.data})
        }, error => {
            this.setState({type: 'alert-danger', text: error.data.message})
        })
    }

    selectDeck = (deck) => {
        PubSub.publish('deck', deck)
        this.setState(state => {
            return {...state, deck}
        }, this.findAll)
    }

    orderByDescription = () => {
        return this.state.urlConfig().description
    }

    render(){
        return (
            <>  
                <div className="container">
                    <div className="row mb-3">
                        <div style={deckSelection}>
                            <select className="form-control" onChange={(event) => this.selectDeck(event.target.value)}>
                                <option key="default">Choose your deck</option>
                                {this.state.decks.map(deck => <option key={deck.id} value={deck.id} title={deck.description}>{deck.name}</option>)}
                            </select>
                        </div>
                        <div style={orderDescription}>
                            {this.orderByDescription()}
                        </div>
                    </div>
                    <div style={{marginBottom: '50px'}}>
                        {TableComponent(this.state.data)}
                    </div>
                </div>
                <Footer></Footer>
            </>
        )
    }
       
}