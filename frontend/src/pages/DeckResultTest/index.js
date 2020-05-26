import React, { Component } from "react";
import DeckResultTestService from "./service";

export default class DeckResultTest extends Component {

    constructor(props){
        super(props)
        this.state = {
            result: {}
        }
    }

    componentDidMount(){
        const id = this.props.match.params['id']
        DeckResultTestService.findById(id).then(response => {
            console.log('response => ', response.data)
            this.setState({result: response.data})
        })
    }

    render(){
        return (
            <>
                <h1>Dock result test</h1>
                
                <p>{this.state.result.description}</p>
                <p>{this.state.result.timeStamp}</p>
                
                {/* {this.state.result.answers.map(answer => {
                    return <p>{`${answer.description} | ${answer.total}`}></p>
                })} */}
            </>
        )
    }

}