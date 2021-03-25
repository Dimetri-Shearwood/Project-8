import "./App.css";
import React, { Component } from "react";
import {fighters, tracks} from "./data.json"

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
//     fetch("https://over-9000.herokuapp.com/fighters/track/", requestOptions)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({ fighters: data });
//       });
//   };


//Local 
  getAllFighters = () => {

  }



  componentDidMount() {
    this.getAllFighters();
  }

  getSelected = (selectedData) => {
      this.setState({selected: selectedData})
  }

  handleAddChange = (e) => {
      
      this.setState({newFighter: {...this.state.newFighter, [e.target.name]:e.target.value}})
  }
  render() {
      console.log(this.state.selected)

    const { name, attack, description, origin} = this.state.selected

    // const { name, url} = this.state.tracks
    

    return (
      <div className="App">
        <div>App</div>
        <div>
           <h1>Create New Fighter</h1> 
           <form>
               <input type="text" name="" placeholder="Name" onChange={this.handleAddChange}/>
               <input type="text" name="" placeholder="Attack" onChange={this.handleAddChange}/>
               <input type="text" name="" placeholder="Description" onChange={this.handleAddChange}/>
               <input type="text" name="" placeholder="Origin" onChange={this.handleAddChange}/>
               <button type="submit">Add Fighter</button>
            </form>

        </div>
        <div>
            <h1>Detail</h1>
            { this.state.selected.name && <div>
                <h2>Name: {name}</h2>
                <h3>Attack: {attack}</h3>
                <h3>Description: {description}</h3>
                <h3>Place of Origin: {origin}</h3>
                </div>}
        </div>
        <div>
          <h1>Index</h1>
          {this.state.fighters.map(fighters =>
            <div onClick={()=>this.getSelected(fighters)} key={fighters.id}>{fighters.name}</div>
          )}
        </div>
        
      </div>
    );
  }
}
