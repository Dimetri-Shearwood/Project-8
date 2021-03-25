import "./App.css";
import React, { Component } from "react";
import {fighters, tracks} from "./data.json"

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fighters: fighters,
      tracks: tracks,
      selected: {}
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

  render() {
      console.log(this.state.selected)

    const { name, attack, description, origin} = this.state.selected
    

    return (
      <div className="App">
        <div>App</div>
        <div>
           <h1>Create New Fighter</h1> 
           <form>
               <input type="text" name="" placeholder="Name" />
               <input type="text" name="" placeholder="Attack" />
               <input type="text" name="" placeholder="Description" />
               <input type="text" name="" placeholder="Origin" />
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
