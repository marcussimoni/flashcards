import React from 'react'
import './style.css'

const ModalComponent = (props) => {
    return (
        <div className="modal-component" id="modal-component">
            <div className="modal-main">
                {props.children}
            </div>
        </div>                
    )
}

export default ModalComponent;