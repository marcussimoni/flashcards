import styled from 'styled-components'

const ModalContent = styled.div`
    display: block;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    left: 0;
    top: 0;
`

const ModalMain = styled.div `
    position: relative;
    width: 50% !important;
    height: 60%;
    top: 30%;
    margin: 0 auto;
    background-color: #fff;
    opacity: 1;
    padding: 20px;
    overflow-y: auto;
    max-height: 100%;
    border-radius: 10px;
`

const ModalFooter = styled.div`
    width: 100%;
    text-align: right;
`

export {ModalContent, ModalMain, ModalFooter }