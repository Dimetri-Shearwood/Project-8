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

  getAllFighters = () => {
    const requestOptions = {
      method: "GET",
    };
    fetch("https://over-9000.herokuapp.com/fighters/track/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ fighters: data });
      });
  };
  componentDidMount() {
    this.getAllFighters();
  }

  getSelected = (selectedData) => {
      this.setState({getSelected: selectedData})
  }

  render() {
      console.log(this.state.selected)

    // const { name, attack, description, origin} = this.state.selected
    

    return (
      <div className="App">
        <div>App</div>
        <div>
            <h1>Detail</h1>
            {/* { this.state.selected && <div>
                <h2></h2>
                </div>} */}
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
