import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Reviews from './Reviews.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('Test Component entry point', function () {
  it('renders without crashing given the required props', () => {
    const wrapper = shallow(<Reviews />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});