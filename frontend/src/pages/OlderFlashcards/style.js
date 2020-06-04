import styled from 'styled-components'

const IconStyles = styled.div`
    position: relative;
    color: #f86348;
    cursor: pointer;
`

const IconCounter = styled.span`
    position: absolute;
    font-size: 14px;
    margin-top: 8px !important;
    margin-left: -12px !important;
    padding: 2px;
`

const FloatButton = styled.div`
    float: right;
    margin-right: 10px;
` 

const FlashcardItens = styled.input`
    cursor: pointer;
    margin-right: 5px !important;
`

export {IconStyles, IconCounter, FloatButton, FlashcardItens}