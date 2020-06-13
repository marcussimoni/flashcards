import React from 'react'
import { ModalContent, ModalMain, ModalFooter } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'

const ModalComponent = (props) => {
    let closeButton = null
    if(props.close){
        closeButton = (
            <button className="btn btn-danger" onClick={props.close} data-for="close" data-tip="Close modal">
                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>&nbsp;
                <span>Close</span>
                <ReactTooltip id="close" place="top" type="dark" effect="float"/>
            </button>
        )
    }
    return (
        <ModalContent id="modal-component">
            <ModalMain>
                {props.children}
                <ModalFooter>
                    {closeButton}
                </ModalFooter>
            </ModalMain>
        </ModalContent>
    )
}

export default ModalComponent;