import styled from 'styled-components'

const DeckSelection = styled.div`
    font-size: 14px;
    margin-left: 5%;
`

const OrderDescription = styled.div`
    font-size: 14px;
    font-style: italic;
    padding-top: 8px;
`

const NewDeckContent = styled.div`
    width: 80%;
    margin: 0 auto;
` 

const SortLink = styled.a`
    font-style: italic;
    &:hover{
        color: #4f5d75 !important;
        text-decoration: underline !important;
        cursor: pointer;
    }
`

export { DeckSelection, OrderDescription, NewDeckContent, SortLink }