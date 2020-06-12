import React from 'react'
import {ComboBox, ComboBoxItem} from './style'

const ComboBoxComponent = (props) => {

    return (
        <ComboBox onChange={(event) => props.onChange(event.target.value)}>
            <ComboBoxItem>Select ...</ComboBoxItem>
            {props.data && props.data.map(item =>  {
                return (
                    <ComboBoxItem value={item[props.selectedValue]} key={item[props.keyValue]}>
                        {item[props.value]}
                    </ComboBoxItem>
                )})
            }
        </ComboBox>
    )

}

export default ComboBoxComponent;