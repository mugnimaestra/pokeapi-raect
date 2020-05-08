import React from 'react';
import { mount } from "enzyme";
import App from './App';

describe("testing the whole app", () => {
  it("renders without crashing", () => {
    mount(<App />);
  });
});