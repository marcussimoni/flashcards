import React from 'react'
import {ComboBox, ComboBoxItem} from './style'

const ComboBoxComponent = (props) => {

    let defaultItem = <ComboBoxItem>Select ...</ComboBoxItem>

    if(props.defaultItem){
        defaultItem = <ComboBoxItem>{props.defaultItem} ...</ComboBoxItem>
    }

    return (
        <ComboBox onChange={(event) => props.onChange(event.target.value)}>
            {defaultItem}
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