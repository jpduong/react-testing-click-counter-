import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 *
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containg node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");

  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");

  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");

  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("clicking button decrements counter", () => {
  const counter = 10;
  const wrapper = setup(null, { counter });

  // find button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("counter can not go below 0", () => {
  const wrapper = setup();

  // find button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(0);
});

test("error shows when trying to go below 0 count", () => {
  const wrapper = setup();

  // find button and click decrement
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  const errorDiv = findByTestAttr(wrapper, "error-message");
  expect(errorDiv.length).toBe(1);
});

test("error message is showing and is cleared once increment button is clicked", () => {
  const wrapper = setup();

  // find decrement button and click decrement
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  decrementButton.simulate("click");

  // find increment button and click increment
  const incrementButton = findByTestAttr(wrapper, "increment-button");
  incrementButton.simulate("click");

  const errorDiv = findByTestAttr(wrapper, "error-message");
  expect(errorDiv.length).toBe(0);
});
