//Libraries
import React, { Component } from "react";
import { NavLink, Route, withRouter } from "react-router-dom";
import axios from "axios";

// Components
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import NavBar from "./components/NavBar";

//Styles
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: "",
      activeSmurf: null
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => {
        console.log("App CDM response.data", response.data);
        this.setState({
          smurfs: response.data
        });
      })
      .catch(error => {
        console.log("App CDM error", error);
      });
  }

  addSmurf = (event, newSmurf) => {
    event.preventDefault();
    console.log("addSmurf event", event);
    axios
      .post("http://localhost:3333/smurfs", newSmurf)
      .then(response => {
        console.log("POST response.data", response.data);
        this.setState({
          smurfs: response.data
        });
      })
      .catch(error => {
        console.log("App addSmurf error", error);
      });
  };

  // deleteFriend = (e, id) => {
  //   e.preventDefault();
  //   axios
  //     .delete(`http://localhost:5000/friends/${id}`)
  //     .then(res => this.setState({ friends: res.data}))
  //     .catch(err => console.log(err))
  // }

  deleteSmurf = (event, id) => {
    event.preventDefault();
    console.log("deleteSmurf event", event);
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        console.log("DELETE response.data", response.data);
        this.setState({
          smurfs: response.data
        });
      })
      .catch(error => {
        console.log("App deleteSmurf error", error);
      });
  };

  updateSmurf = (event, newSmurf) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3333/smurfs/${newSmurf.id}`, newSmurf)
      .then(response => this.setState({ smurfs: response.data }))
      .catch(error => console.log("PUT error", error));
  };

  setUpdateForm = (event, newSmurf) => {
    event.preventDefault();
    this.setState({ activeSmurf: newSmurf });
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <Route
          exact
          path="/smurfs"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              setUpdateForm={this.setUpdateForm}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <SmurfForm
              {...props}
              smurfs={this.state.smurfs}
              addSmurf={this.addSmurf}
              updateSmurf={this.updateSmurf}
              activeSmurf={this.state.activeSmurf}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
