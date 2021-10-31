import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals'
import {iron_man} from './tempData'
import Search from './Search.jsx';


// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

// describe('Test Component entry point', function () {
//   it('renders without crashing given the required props', () => {
//     const wrapper = shallow(<Search />);
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });
// });
describe('Search Display', () => {
  it('updates search_value state when user types', () => {
    const wrapper = mount(<Search />)
    const component = wrapper.instance()
    jest.spyOn(component, 'handle_search')
    let testSearch = {target: {value: 'test'}}

    component.handle_search(testSearch)
    expect(component.state.search_val).toEqual('test')
    jest.clearAllMocks()

  })
  it('updates search_display state when handleClick is fired', () => {
    const wrapper = mount(<Search></Search>)
    const component = wrapper.instance()
    jest.spyOn(component, 'handleClick')
    component.handleClick()

    expect(component.state.search_display.length).toBe(10)
    jest.clearAllMocks()
  })
})
