import React from "react";
import {Table} from 'reactstrap'
import {PubSub} from 'pubsub-js'

let selectedItens = []

const selectWord = (value) => {
    const selectedValue = value.target.value
    
    if(selectedItens.includes(selectedValue)){
        selectedItens = selectedItens.filter(v => v !== selectedValue)
    } else {
        selectedItens.push(selectedValue)
    }

    PubSub.publish('add-items', selectedItens)

}

const buildTableBody = (data) => {
    if(data.length === 0){
        return <tr></tr>
    } else {
        return data.map(item => {
            return (
                <tr valign="middle" key={item.id} id={item.id}>
                    <td><input type="checkbox" value={item.id} onChange={selectWord}></input></td>
                    <td style={{fontWeight: '600'}}>{item.question}</td>
                    <td valign="middle">{item.answer}</td>
                </tr>
            )
        })

    }
}

const TableComponent = (data) => {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Front flashcard</th>
                        <th>Back flashcard</th>
                    </tr>
                </thead>
                <tbody>
                    { buildTableBody(data) }
                </tbody>
            </Table>
        </div>
    )

}

export default TableComponent;