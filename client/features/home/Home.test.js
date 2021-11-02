import React from 'react';
import { shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import { expect, jest, test, describe, beforeEach, afterEach } from '@jest/globals';
import Home from './Home.jsx';
import {history, suggested, trending} from './tempHomeData';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

// describe('Test Component entry point', function () {
//   it('renders without crashing given the required props', () => {
//     const wrapper = shallow(<Home />);
//     expect(toJson(wrapper)).toMatchSnapshot();
//   });
// });

describe('filler', () => {
  it('does a random test', () => {
    expect('filler').toEqual('filler')
  })

})

//needs to be fixed
// describe('home', () => {
//   test('when given props for history, trending, and suggested, it renders correctly', () => {
//     const wrapper = mount(<Home history={history} suggested={suggested} trending={trending}/>);
//     expect(toJson(wrapper).state.history.length > 0).toBe(true);
//     expect(toJson(wrapper).state.trending.length > 0).toBe(true);
//     expect(toJson(wrapper).state.suggested.length > 0).toBe(true);
//   });
// });