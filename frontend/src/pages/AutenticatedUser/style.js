import styled from 'styled-components'

const AutenticatedUserContent = styled.div`
    width: 150px;
    height: 50px;
    color: #ffffff;
    margin-right: 20px;
    text-align: right;
`

const AutenticatedUserName = styled.label`
    width: 100%;
`

const AutenticatedUserLogout = styled.a`
    width: 100%;
    font-size: 12px;
    font-style: italic;
    &:hover{
        color: #bfc0c0 !important;
        text-decoration: underline !important;
        cursor: pointer;
    }
`

export { AutenticatedUserContent, AutenticatedUserName, AutenticatedUserLogout }