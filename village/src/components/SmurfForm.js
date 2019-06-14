import React, { Component } from "react";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSmurf: {
        name: "",
        age: "",
        height: ""
      }
    };
  }

  addSmurf = (event, newSmurf) => {
    event.preventDefault();
    // add code to create the smurf using the api
    this.props.addSmurf(event, this.state.newSmurf);

    this.setState({
      newSmurf: {
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

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
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
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
