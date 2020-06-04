import React from 'react'
import { ModalContent, ModalMain } from './style'

const ModalComponent = (props) => {
    return (
        <ModalContent id="modal-component">
            <ModalMain>
                {props.children}
            </ModalMain>
        </ModalContent>      
    )
}

export default ModalComponent;