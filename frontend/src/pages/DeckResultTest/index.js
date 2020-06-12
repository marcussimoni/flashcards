import React, { Component } from "react";
import DeckResultTestService from "../../services/DeckResultService";
import './style.css'
import ModalComponent from '../../components/ModalComponent'
import styled from 'styled-components'

const Link = styled.span`
    cursor: pointer;
    color: #4f5d75;
    &:hover {
        color: blueviolet;
        text-decoration: underline;
    }
`


export default class DeckResultTest extends Component {

    constructor(props){
        super(props)
        this.state = {
            results: [],
            result: {
                answers: []
            },
            showModal: false
        }
    }

    componentDidMount(){
        this.findAll()
        window.onkeydown = (event) => {
            const ESCAPE = 27
            if(event.keyCode === ESCAPE){
                this.setState({showModal: false})
            }
        }
    }

    findAll = () => {
        DeckResultTestService.findAll().then(response => {
            this.setState({results: response.data})
        })
    }

    getValues = (key) => {

        if(this.state.result.answers){
            return this.state.result.answers.map(answer => {
                return <td>{answer[key]}</td>
            })
        } else {
            return ""
        }
        
    }

    dateFormat = (date) => {
        if(date){
            return `${date[2]}/${date[1]}/${date[0]} at: ${date[3]}:${date[4]}`
        } else {
            return ''
        }
    }

    getTotalCards = () => {
        return this.state.result.answers.map(result => result.total).reduce((x,y) => x += y)
    }

    showModal = () => {

        return(
            
            <ModalComponent>
                <h1>Result test</h1>
                    
                    <h5>Deck selected: {this.state.result.description}</h5>
                    <h7>Taken in: {this.dateFormat(this.state.result.timeStamp)}</h7>
                    
                    <table className="table tripped text-center">
                        <thead>
                            <tr>
                                {this.getValues('description')}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.getValues('total')}
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={this.state.result.answers.length - 1}></td>
                                <td>
                                    Total: {this.getTotalCards()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    <hr/>
                    <div className="col-md-12">
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={() => this.setState({showModal: false})}>Close</button>
                    </div>
                </div>
            </ModalComponent>

        )
    }

    selectResult = (item) => {
        DeckResultTestService.findById(item.id).then(response => {
            this.setState({result: response.data, showModal: true})
            console.log('result => ', response.data)
        })
    }

    render(){
        return (
            <div className="container text-center">
                {this.state.showModal ? this.showModal() : null}
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Deck</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.results.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <td><Link onClick={() => this.selectResult(item)}>{item.id}</Link></td>
                                        <td><Link onClick={() => this.selectResult(item)}>{item.deck.name}</Link></td>
                                        <td><Link onClick={() => this.selectResult(item)}>{item.deck.description}</Link></td>
                                        <td><Link onClick={() => this.selectResult(item)}>{this.dateFormat(item.timeStamp)}</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}