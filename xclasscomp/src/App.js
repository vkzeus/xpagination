import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0, // Initialize the count state
    };
  }

  // Method to handle increment
  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  // Method to handle decrement
  handleDecrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {/* Display the count */}
        <h1>Count: {this.state.count}</h1>

        {/* Increment button */}
        <button onClick={this.handleIncrement} style={{ marginRight: "10px" }}>
          Increment
        </button>

        {/* Decrement button */}
        <button onClick={this.handleDecrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
