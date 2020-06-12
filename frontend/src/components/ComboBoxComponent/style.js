import styled from 'styled-components'

const ComboBox = styled.select`
    display: block;
    background-color: #fff;
    padding: 5px 25px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    outline: none;
`

const ComboBoxItem = styled.option`
    font-family: 'script !important';
    padding: 50px;  
    background-color: #4f5d75;
    border-radius: 5px;
    color: #bfc0c0;
    border-bottom: 1px solid #bfc0c0;
`

export {ComboBox, ComboBoxItem}