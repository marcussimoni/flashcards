import React, {Component} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import './style.css'

export default class Menu extends Component {
    
    constructor(){
        super()
        this.state = {
            showMenu: false
        }
    }

    componentDidMount(){
        // window.onkeydown = (event) => {
        //     const ESCAPE = 27
        //     if(event.keyCode === ESCAPE){
        //         this.setState({showMenu: false})
        //     }
        // }
    }

    openMenu = () => {
        this.setState({showMenu: !this.state.showMenu})
    }
    
    render = () => {
        return (
            <div className="content">
                <div className="button" onClick={() => this.openMenu()}>
                    <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                </div>
                {
                    this.state.showMenu ?
                    <div className="menu">
                        <ul className="list">
                            <li><Link className="link" to="/deck/new">New deck</Link></li>
                            <li><Link className="link" to="/deck">Decks</Link></li>
                            <li><Link className="link" to="/flashcards">Flashcards</Link></li>
                            <li><Link className="link" to="/test-result">Test results</Link></li>
                        </ul>
                    </div> :
                    null
                }
            </div>
        )
    }
}

