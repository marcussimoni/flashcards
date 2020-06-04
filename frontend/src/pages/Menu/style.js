import styled from 'styled-components'

const ItemMenu = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-style: italic;
    &:hover {
        color: blueviolet;
    }
`;

const List = styled.ul`
    padding-inline-start: 0px !important;
`

const MenuContent = styled.div `
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid black;
    box-shadow: 1px 1px 1px #aaa;
    margin-left: 20px;
    margin-top: -30px;
    padding: 20px;
    display: none;
`

const MenuIcon = styled.div`
    background-color: #fff;
    width: 25px;
    height: 25px;
    padding: 0 5px;
    border-radius: 5px;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        ${MenuContent}{
            display: inline;
        }
    }
`

const Content = styled.div `
    width: 0px;
    display: flex;
    align-items: center;
    margin-left: 20px;
`

export {ItemMenu, List, MenuContent, MenuIcon, Content}