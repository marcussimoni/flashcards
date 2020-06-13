import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import DeckService from '../../services/DeckService'
import ReactTooltip from 'react-tooltip'

export default class NewDeck extends Component {

    constructor(){
        super()
        this.state = {
            deck: {
                name: '',
                description: ''
            },
            decks: []
        }
    }

    componentDidMount(){
        this.findAll()
    }

    findAll = () => {
        DeckService.findAll().then(response => {
            this.setState({decks: response.data})
        })
    }

    save = () => {
        const deck = this.state.deck
        if(deck.name && deck.description){

            if(deck.id){
                DeckService.updateDeck(deck).then(response => {
                    alert('New deck updated')
                    this.setState({deck: {name: '', description: ''}})
                    this.findAll()
                })
            } else {
                DeckService.createNew(deck).then(response => {
                    alert('New deck created')
                    this.setState({deck: {name: '', description: ''}})
                    this.findAll()
                })
            }

        } else {
            alert('fields required')
        }
    }
   
    setName = (event) => {
        this.setState({deck: {...this.state.deck, name: event.target.value}})
    }

    setDescription = (event) => {
        this.setState({deck: {...this.state.deck, description: event.target.value}})
    }

    setToUpdate = (deck) => {
        this.setState({deck})
    }

    delete = (deck) => {
        const option = window.confirm(`Do you want to delete "${deck.name}" deck?`)
        if(option){
            DeckService.delete(deck).then(response => {
                alert('deck deleted')
                this.findAll()
            })
        }
    }

    render(){
        return (
            <div>
                <div className="new-deck-content">
                    
                    <p>Create new Deck</p>
                    <div className="col-md-12">
                        <div className="row">
                            <input className="form-control col-md-5" onChange={this.setName}
                                    type="input" maxLength="100" placeholder="Name of the deck"
                                    value={this.state.deck.name}></input>

                            <input className="form-control col-md-5 ml-1" type="input" onChange={this.setDescription}
                                    maxLength="100" placeholder="Description of the deck"
                                    value={this.state.deck.description}></input>

                            <button className="ml-1 btn btn-primary" onClick={this.save}>
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>&nbsp;save
                            </button>
                        </div>
                    </div>
                    <table className="table table-striped text-center mt-5">
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th className="text-center">actions</th>
                            </tr>
                            {
                                this.state.decks.map(deck => {
                                    return (
                                        <tr key={deck.id}>
                                            <td>{deck.name}</td>
                                            <td>{deck.description}</td>
                                            <td className="text-center" style={{fontSize: '12px'}}>
                                                <ReactTooltip id="tooltip" delayShow="100" place="top" type="dark" effect="float"/>
                                                <button data-for="tooltip" data-tip="select deck for update"
                                                    className="btn btn-warning" onClick={() => this.setToUpdate(deck)}>
                                                    <i className="fa fa-refresh fa-sm"></i>
                                                </button>
                                                <button data-for="tooltip" data-tip="Delete this deck and all flashcards"
                                                    className="btn btn-danger ml-1 fa-sm" onClick={() => this.delete(deck)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        )
    }

}