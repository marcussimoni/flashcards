import React, { Component } from "react";
import TableComponent from "../../components/TableComponent";
import FlashcardService from "../../services/FlashcardService";
import PubSub from 'pubsub-js'
import DeckService from "../../services/DeckService";
import Footer from "../Footer";
import ComboBoxComponent from "../../components/ComboBoxComponent";
import { SortLink } from './style'
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ModalComponent from '../../components/ModalComponent'
import NewDeck from "./newDeck";

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
            urlConfig: {},
            showModalDeck: false
        }

        window.onkeydown = (event) => {
            const LETTER_T = 84
            const CTRL_ALT_PRESSED = event.ctrlKey && event.altKey

            if(CTRL_ALT_PRESSED && event.keyCode === LETTER_T){
                this.changeListOrder();
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
            description: 'Ordered by timestamp',
            url: `/question/deck/${this.state.deck}?sort=timeStamp,DESC`
        }
    }

    subscribe = (msg, data) => {
        this.findAll()
    }

    changeListOrder = () => {
        const urlConfig = this.state.urlConfig();
        if (urlConfig.url === this.orderByQuestion().url) {
            this.setState({ urlConfig: this.orderByTimeStamp });
        }
        else {
            this.setState({ urlConfig: this.orderByQuestion });
        }
        this.findAll(urlConfig.url);
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

    manageDecks = () => {
        this.setState({showModalDeck: true})
    }

    closeModal = () => {
        this.setState({showModalDeck: false})
        this.findAllDecks()
    }

    render(){
        let modalDeck = null
        
        if(this.state.showModalDeck){
            modalDeck = (
                <ModalComponent close={() => this.closeModal()}>
                    <NewDeck></NewDeck>
                </ModalComponent>
            )
        }

        return (
            <>  
                {modalDeck}
                <div className="container">
                    <div className="row col-md-12 mb-3">
                        
                        <div className="row col-md-6 text-left">
                            <ComboBoxComponent data={this.state.decks} onChange={this.selectDeck}
                                                keyValue="id" value="name" selectedValue="id"></ComboBoxComponent>
                            <button onClick={this.manageDecks} className="btn btn-info ml-2" data-for="new-deck" data-tip="Add/remove decks">
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                <ReactTooltip id="new-deck" delayShow="100" place="top" type="dark" effect="float"/>
                            </button>                    
                        </div>
                        <div className="col-md-6 text-right">
                            <SortLink onClick={() => this.changeListOrder()}  data-for="sort" data-tip="Change sort of flashcards (ctrl + alt + t)">{this.orderByDescription()}</SortLink>
                            <ReactTooltip id="sort" delayShow="100" place="top" type="dark" effect="float"/>
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