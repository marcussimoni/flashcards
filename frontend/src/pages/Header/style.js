import styled from 'styled-components'

const HeaderMain = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #4f5d75;
    position: fixed;
    top: 0;
    box-shadow: 1px 5px 5px #aaa;
    z-index: 1;

`

const HeaderMenu = styled.div`
    width: 10%;
` 

const HeaderContent = styled.div`
    width: 80%;
` 

const HeaderNotifications = styled.div`
    width: 10%;
` 

export {HeaderMain, HeaderMenu, HeaderContent, HeaderNotifications}