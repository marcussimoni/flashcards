import styled from 'styled-components'

const LinkComponent = styled.span`
    color: #ffffff;
    width: 100%;
    font-size: 12px;
    font-style: italic;
    margin-left: 10px;
    cursor: pointer !important;
    &:hover{
        color: #bfc0c0 !important;
        text-decoration: underline !important;
    }
`

const Ul = styled.ul`
    
`

export {LinkComponent, Ul}