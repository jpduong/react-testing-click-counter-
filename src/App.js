import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">the counter is currently</h1>
        <button data-test="increment-button">Increment counter</button>
      </div>
    );
  }
}

export default App;
