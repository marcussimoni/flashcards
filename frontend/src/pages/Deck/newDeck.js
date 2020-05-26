import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import DeckService from './service'

const content = {
    width: '80%',
    margin: '0 auto'
}

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
                <div style={content}>

                    <div className="col-md-12">
                        <p>Create new Deck</p>
                        <div className="row">
                            <input className="form-control col-md-3" onChange={this.setName}
                                    type="input" maxLength="100" placeholder="Name of the deck"
                                    value={this.state.deck.name}></input>

                            <input className="form-control col-md-3 ml-3" type="input" onChange={this.setDescription}
                                    maxLength="100" placeholder="Description of the deck"
                                    value={this.state.deck.description}></input>

                            <button className="btn btn-primary ml-3" onClick={this.save}>
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>&nbsp;Save
                            </button>
                        </div>
                    </div>
                    <table className="table mt-5">
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
                                                <button className="btn btn-warning" onClick={() => this.setToUpdate(deck)}>
                                                    <i className="fa fa-refresh fa-sm"></i>
                                                </button>
                                                <button className="btn btn-danger ml-1 fa-sm" onClick={() => this.delete(deck)}>
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