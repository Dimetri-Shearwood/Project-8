import "./App.css";
import React, { Component } from "react";
import {fighters, tracks} from "./data.json"
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
      this.setState({selected: selectedData})
  }

  handleAddChange = (e) => {
      e.preventDefault()
      this.setState({newFighter: {...this.state.newFighter, [e.target.name]:e.target.value}})
  }
  render() {
      console.log(this.state.newFighter)

    const { name, attack, description, origin} = this.state.selected

    // const { name, url} = this.state.tracks
    

    return (
      <div className="App">
        <div>App</div>
        <div>
           <h1>Create New Fighter</h1> 
           <form onSubmit={this.createFighter}>
               <input type="text" name="name" placeholder="Name" value={this.state.newFighter.name} onChange={this.handleAddChange}/>
               <input type="text" name="attack" placeholder="Attack" value={this.state.newFighter.attack} onChange={this.handleAddChange}/>
               <input type="text" name="description" placeholder="Description" value={this.state.newFighter.description} onChange={this.handleAddChange}/>
               <input type="text" name="origin" placeholder="Origin" value={this.state.newFighter.origin} onChange={this.handleAddChange}/>
               <button type="submit">Add Fighter</button>
            </form>

        </div>
        <div>
            <h1>About</h1>
            { this.state.selected.name && <div>
                <h2>Name: {name}</h2>
                <h3>Attack: {attack}</h3>
                <h3>Description: {description}</h3>
                <h3>Place of Origin: {origin}</h3>
                </div>}
        </div>
        <div>
          <h1>Fighters</h1>
          {this.state.fighters.map(fighters =>
            <div onClick={()=>this.getSelected(fighters)} key={fighters.id}>{fighters.name}</div>
          )}
        </div>
        
      </div>
    );
  }
}
