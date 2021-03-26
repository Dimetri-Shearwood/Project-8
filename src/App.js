import "./App.css";
import React, { Component } from "react";
import { fighters, tracks } from "./data.json"
import 'bulma/css/bulma.min.css'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fighters: fighters,
            tracks: tracks,
            selected: {},
            newFighter: {}
        };
    }
    // Server
    //   getAllFighters = () => {
    //     const requestOptions = {
    //       method: "GET",
    //     };
    //     fetch("https://over-9000.herokuapp.com/fighters/tracks/", requestOptions)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         this.setState({ fighters: data });
    //       });
    //   };


    //Local 
    getAllFighters = () => {

    }

    createFighter = (e) => {
        e.preventDefault()
        const newFighter = this.state.newFighter
        console.log(newFighter)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFighter)
        };
        fetch("https://over-9000.herokuapp.com/fighters/fighters/", requestOptions)
            .then((response) => response.json())
            .then((sendFighter) => {
                this.setState({ fighters: [...this.state.fighters, sendFighter] });
            });
    }

    componentDidMount() {
        this.getAllFighters();
    }

    getSelected = (selectedData) => {
        this.setState({ selected: selectedData })
    }

    handleAddChange = (e) => {
        e.preventDefault()
        this.setState({ newFighter: { ...this.state.newFighter, [e.target.name]: e.target.value } })
    }


    render() {
        console.log(this.state.newFighter)

        const { name, attack, description, origin } = this.state.selected

        // const { name, url} = this.state.tracks


        return (
            <div className="App">
                <div className="title is-1">Mortal Kombat New Comers</div>
                <div className="box container is-max-desktop">
                    <h1 className="title is-3">Create New Fighter</h1>
                    <form className="field" onSubmit={this.createFighter}>
                        <div className="control">
                            <label className="label">Name:</label>
                            <input className="input" type="text" name="name" placeholder="Name" value={this.state.newFighter.name} onChange={this.handleAddChange} />
                        </div>
                        <div className="control">
                            <label className="label">Attack:</label>
                            <input className="input" type="text" name="attack" placeholder="Attack" value={this.state.newFighter.attack} onChange={this.handleAddChange} />
                        </div>
                        <div className="control">
                            <label className="label">Description:</label>
                            <input className="input" type="text" name="description" placeholder="Description" value={this.state.newFighter.description} onChange={this.handleAddChange} />
                        </div>
                        <div className="control">
                            <label className="label">Origin:</label>
                            <input className="input" type="text" name="origin" placeholder="Origin" value={this.state.newFighter.origin} onChange={this.handleAddChange} />
                        </div>
                        <button className="button is-outlined is-primary is-small ml-2" type="submit">Add Fighter</button>

                    </form>

                </div>

                <div className="box container is-max-desktop">

                    <div className="content">
                        <h1 className="title is-3">About</h1>
                        {this.state.selected.name && <ul>
                            <li>Name: {name}</li>
                            <li>Attack: {attack}</li>
                            <li>Description: {description}</li>
                            <li>Place of Origin: {origin}</li>
                            <button className="button is-danger is-outlined is-small" type="delete" onClick={this.handleDelete}>Delete Fighter</button>
                        </ul>}
                    </div>
                </div>
                <div className="box container is-max-desktop">
                    <h1 className="title is-3">Fighters</h1>
                    {this.state.fighters.map(fighters =>
                        <div onClick={() => this.getSelected(fighters)} key={fighters.id}>{fighters.name}</div>
                    )}
                </div>
            </div>
        );
    }
}
