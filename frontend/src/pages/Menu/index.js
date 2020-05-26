import React, {Component} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const link = {
    textDecoration: 'none',
    cursor: 'pointer',
    fontStyle: 'italic'
}

const list = {
    display: 'inline',
}

const menu = {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid black',
    boxShadow: '1px 1px 1px',
    marginLeft: '40px',
    marginTop: '50px',
    padding: '20px'
}

const button = {
    backgroundColor: '#fff',
    width: '25px',
    height: '25px',
    padding: '0 5px',
    borderRadius: '5px',
    marginLeft: '10px',
    marginTop: 'auto 0',
    cursor: 'pointer',    
}

const content = {
    width: '50px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px'

}

export default class Menu extends Component {
    
    constructor(){
        super()
        this.state = {
            showMenu: false
        }
    }

    componentDidMount(){
        window.onkeydown = (event) => {
            const ESCAPE = 27
            if(event.keyCode === ESCAPE){
                this.setState({showMenu: false})
            }
        }
    }

    openMenu = () => {
        this.setState({showMenu: !this.state.showMenu})
    }
    
    render = () => {
        return (
            <div style={content}>
                <div style={button} onClick={() => this.openMenu()}>
                    <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                </div>
                {
                    this.state.showMenu ?
                    <div style={menu}>
                        <ul style={list}>
                            <li><Link style={link} to="/deck/new">New deck</Link></li>
                            <li><Link style={link} to="/deck">Decks</Link></li>
                            <li><Link style={link} to="/flashcards">Flashcards</Link></li>
                        </ul>
                    </div> :
                    null
                }
            </div>
        )
    }
}

