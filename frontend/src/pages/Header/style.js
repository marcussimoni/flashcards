import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    background-color: #4f5d75;
    position: fixed;
    top: 0;
    box-shadow: 1px 5px 5px #aaa;
    z-index: 1;
`

    const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    height: 100px;
    margin-right: auto;
    margin-left: auto;
`

const HeaderMenu = styled.div`
    width: 10%;
` 

const HeaderContent = styled.div`
    width: 80%;
` 

const HeaderNotifications = styled.div`
    
` 

export {Container, HeaderMain, HeaderMenu, HeaderContent, HeaderNotifications}