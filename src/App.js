import "./App.css";
import React, { Component } from "react";
//import { fighters, tracks } from "./data.json";
import "bulma/css/bulma.min.css";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            fighters: [],
            tracks: [],
            selected: {},
            newFighter: {},
            editFighter: {},
            showCreate: false,
            showUpdate: false,
            isActive: false
        };
    }
    // Server
    getAllFighters = () => {
        const requestOptions = {
            method: "GET",
        };
        fetch("https://over-9000.herokuapp.com/fighters/fighters/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ fighters: data });
            });
    };
    getAllTracks = () => {
        const requestOptions = {
            method: "GET",
        };
        fetch("https://over-9000.herokuapp.com/fighters/tracks/", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ tracks: data });
            });

    };

    //Local

    createFighter = (e) => {
        e.preventDefault();
        const newFighter = this.state.newFighter;
        console.log(newFighter);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFighter),
        };
        fetch("https://over-9000.herokuapp.com/fighters/fighters/", requestOptions)
            .then((response) => response.json())
            .then((sendFighter) => {
                console.log(sendFighter);
                this.setState({ fighters: [...this.state.fighters, sendFighter] });
            });
    };

    componentDidMount() {
        this.getAllFighters();
        this.getAllTracks()
    }

    getSelected = (selectedData) => {
        this.setState({ selected: selectedData });
    };

    handleAddChange = (e) => {
        e.preventDefault();
        this.setState({
            newFighter: { ...this.state.newFighter, [e.target.name]: e.target.value },
        });
    };

    handleEditChange = (e) => {
        e.preventDefault();
        this.setState({
            editFighter: { ...this.state.editFighter, [e.target.name]: e.target.value },
        })
    }


    deleteFighter = (id) => {
        console.log("delete:", id);
        fetch("https://over-9000.herokuapp.com/fighters/fighters/" + id, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((deleteResp) => {
                console.log(deleteResp);
                const updateFighter = this.state.fighters.filter(
                    (fighter) => fighter._id !== id
                );
                console.log(updateFighter);
            });
    };

    editFighter = (e) => {
        e.preventDefault();

        let editFighter = this.state.editFighter;
        console.log(this.state.selected);
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editFighter),
        };
        fetch("https://over-9000.herokuapp.com/fighters/fighters/" + this.state.selected._id, requestOptions)
            .then((response) => response.json())
            .then((changeFighter) => {
                console.log(changeFighter);
                this.setState({ fighters: [...this.state.fighters, changeFighter] });
            });
    };
    handleShowCreate = (e) => {
        e.preventDefault()
        this.setState({ showCreate: !this.state.showCreate })
    }
    handleShowUpdate = (e) => {
        e.preventDefault()
        this.setState({ showUpdate: !this.state.showUpdate })
    }
    isActive = (e) => {
        e.preventDefault()
        this.setState({ isActive: !this.state.isActive })
        console.log(this.state.isActive)
    }
    render() {
        const { fighterName, attack, description, origin, _id } = this.state.selected;

        // const { name, url} = this.state.tracks

        return (
            <div className="App">
                <div className="title is-1">Mortal Kombat applicants</div>
                <button onClick={this.handleShowCreate} className="button is-dark is-outlined is-small">{this.state.showCreate ? `hide panel` : `create a new fighter`}</button>
                {this.state.showCreate &&
                    <div className="box container is-max-desktop">
                        <h1 className="title is-3">Create New Fighter</h1>
                        <form className="field" onSubmit={this.createFighter}>
                            <div className="columns">
                                <div className="control column is-one-third">
                                    {/* <label className="label">Name:</label> */}
                                    <input
                                        className="input"
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.newFighter.name}
                                        onChange={this.handleAddChange}
                                    />
                                </div>
                                <div className="control column is-one-third">
                                    {/* <label className="label">Attack:</label> */}
                                    <input
                                        className="input"
                                        type="text"
                                        name="attack"
                                        placeholder="Attack"
                                        value={this.state.newFighter.attack}
                                        onChange={this.handleAddChange}
                                    />
                                </div>
                                <div className="control column is-one-third">
                                    {/* <label className="label">Origin:</label> */}
                                    <input
                                        className="input"
                                        type="text"
                                        name="origin"
                                        placeholder="Origin"
                                        value={this.state.newFighter.origin}
                                        onChange={this.handleAddChange}
                                    />
                                </div>
                            </div>
                            <div className="control">
                                <label className="label">Description:</label>
                                <input
                                    className="textarea"
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.newFighter.description}
                                    onChange={this.handleAddChange}
                                />
                            </div>

                            <button
                                className="button is-outlined is-primary is-small ml-2"
                                type="submit"
                            >
                                Add Fighter
            </button>
                        </form>
                    </div>
                }
                <div>



                    {this.state.editFighter &&
                        this.state.showUpdate &&

                        <div className="box container is-max-desktop" >
                            <h1 className="subtitle">Update</h1>
                            <form className="field" onSubmit={(e) => this.editFighter(e)}>

                                <div className="columns">
                                    <div className="control column">
                                        <input
                                            className="input"
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={this.state.editFighter.name}
                                            onChange={this.handleEditChange}
                                        />
                                    </div>
                                    <div className="control column">
                                        <input
                                            className="input"
                                            type="text"
                                            name="attack"
                                            placeholder="Attack"
                                            value={this.state.editFighter.attack}
                                            onChange={this.handleEditChange}
                                        />
                                    </div>

                                    <div className="control column">
                                        <input
                                            className="input"
                                            type="text"
                                            name="origin"
                                            placeholder="Origin"
                                            value={this.state.editFighter.origin}
                                            onChange={this.handleEditChange}
                                        />
                                    </div>
                                </div>
                                <div className="control">
                                    <input
                                        className="textarea"
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        value={this.state.editFighter.description}
                                        onChange={this.handleEditChange}
                                    />
                                </div>

                                <button
                                    className="button is-dark is-outlined is-small"
                                    type="submit"
                                >
                                    Edit
                                </button>
                            </form>
                        </div>
                    }
                </div>
                <div className="box container is-max-desktop">
                    <div className="content">
                        <h1 className="title is-3">About</h1>
                        {this.state.selected.name &&
                            <ul>
                                <li>Name: {fighterName}</li>
                                <li>Attack: {attack}</li>
                                <li>Description: {description}</li>
                                <li>Place of Origin: {origin}</li>

                                <button
                                    className="button is-danger is-outlined is-small"
                                    type="delete"
                                    onClick={() => this.deleteFighter(this.state.selected._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={this.handleShowUpdate}
                                    className="button is-dark is-outlined is-small"
                                >
                                    {this.state.showUpdate ? `hide panel` : `edit this fighter`}
                                </button>
                            </ul>
                        }
                    </div>

                </div>
                <div className="box container is-max-desktop">
                    <h1 className="title is-3">Fighters</h1>
                    {this.state.fighters.map((fighters) => (
                        <div onClick={() => this.getSelected(fighters)} key={fighters.id}>
                            {fighters.name}
                        </div>
                    ))}
                </div>

                <div className={this.state.isActive ? `is-active dropdown` : `dropdown`}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" onClick={this.isActive} aria-controls="dropdown-menu">
                            <span>Tracks</span>
                            <span className="icon is-small">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            {this.state.tracks.map((track) => (
                                <div className="track dropdown-item" >
                                    <a href={track.url}>{track.name}</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
