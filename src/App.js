import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      error: false
    };
  }

  incrementCounter = () => {
    const { counter, error } = this.state;

    if (error) this.setState({ error: false });

    this.setState({ counter: this.state.counter + 1 });
  };

  decrementCounter = () => {
    const { counter } = this.state;

    if (counter === 0) {
      return this.setState({ error: true });
    }

    this.setState({ counter: counter - 1 });
  };

  render() {
    const { error } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">
          the counter is currently {this.state.counter}
        </h1>
        <button onClick={this.incrementCounter} data-test="increment-button">
          Increment counter
        </button>
        <button onClick={this.decrementCounter} data-test="decrement-button">
          Decrement counter
        </button>
        {error && (
          <div data-test="error-message">
            Error: Counter can't go below zero
          </div>
        )}
      </div>
    );
  }
}

export default App;
