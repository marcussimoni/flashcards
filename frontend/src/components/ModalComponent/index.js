import React from 'react'
import { ModalContent, ModalMain, ModalFooter } from './style'

const ModalComponent = (props) => {
    let closeButton = null
    if(props.close){
        closeButton = <button className="btn btn-danger" onClick={props.close}>Close</button>
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