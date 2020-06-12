import React from 'react'
import ComboBoxComponent from '../../components/ComboBoxComponent';

const content = {
    margin: '0 auto', 
    width: '80%', 
    display: 'flex',
    justifyContent: 'center'
}

const data = [
    {id: 1, label: 'Label 1'},
    {id: 2, label: 'Label 2'},
    {id: 3, label: 'Label 3'},
    {id: 4, label: 'Label 4'},
    {id: 5, label: 'Label 5'}
]

const showValue = (value) => {
    alert(`value selected is: ${value}` )
}

const TestComponent = () => {

    return (
            <div style={content}>
                <ComboBoxComponent data={data} keyValue="id" value="label" selectedValue="id" onChange={showValue}></ComboBoxComponent>
            </div>
        )

}

export default TestComponent;