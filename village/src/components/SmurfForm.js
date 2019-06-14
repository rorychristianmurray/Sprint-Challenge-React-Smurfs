import React, { Component } from "react";
import SmurfFormList from "./SmurfFormList";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSmurf: this.props.activeSmurf || {
        name: "",
        age: "",
        height: ""
      },
      active: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeSmurf &&
      prevProps.activeSmurf !== this.props.activeSmurf
    ) {
      this.setState({ newSmurf: this.props.activeSmurf, active: true });
    }
  }

  addSmurf = (event, newSmurf) => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.addSmurf(event, this.state.newSmurf);

    this.setState({
      newSmurf: this.props.activeSmurf || {
        name: "",
        age: "",
        height: ""
      }
    });
  };

  handleInputChange = event => {
    event.persist();
    this.setState(prevState => ({
      newSmurf: {
        ...prevState.newSmurf,
        [event.target.name]: event.target.value
      }
    }));
  };

  updateHandler = (event, newSmurf) => {
    if (this.state.active) {
      this.props.updateSmurf(event, this.state.newSmurf);
    } else {
      this.props.addSmurf(event, this.state.newSmurf);
    }
    this.setState({
      newSmurf: {
        name: "",
        age: "",
        height: ""
      },
      active: false
    });
  };

  render() {
    return (
      <div className="SmurfForm">
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <SmurfFormList
                name={smurf.name}
                smurf={smurf}
                setUpdateForm={smurf.setUpdateForm}
                key={smurf.id}
              />
            );
          })}
        </ul>
        <form className="smurf-form" onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">{`${
            this.state.active ? "Update" : "Add to village"
          }`}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
