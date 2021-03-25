import './App.css';
import React, { Component } from 'react'

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            fighters: {}
        }
    }
    
    getAllFighters = () => {
        fetch('')
    }
    render() {
        return (
        <div className="App">
            <div>App</div>
        
        </div>

        )
    }
}
