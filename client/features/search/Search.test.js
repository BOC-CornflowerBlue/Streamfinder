import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import {ironMan} from './tempData';
import Search from './Search.jsx';


// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('Search Display', () => {
  it('updates searchValue state when user types', () => {
    const wrapper = mount(<Search />);
    const component = wrapper.instance();
    jest.spyOn(component, 'handleSearch');
    let testSearch = {target: {value: 'test'}};

    component.handleSearch(testSearch);
    expect(component.state.searchVal).toEqual('test');
    jest.clearAllMocks();

  });
  it('updates searchDisplay state when handleClick is fired', () => {
    const wrapper = mount(<Search></Search>);
    const component = wrapper.instance();
    jest.spyOn(component, 'handleClick');
    component.handleClick();

    expect(component.state.searchDisplay.length).toBe(10);
    jest.clearAllMocks();
  });
});
