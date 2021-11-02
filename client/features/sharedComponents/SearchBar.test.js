import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import React from 'react';
import SearchBar from './SearchBar.jsx';

describe('Test SearchBar component', () => {
  it('Should call its parent\'s handleSearch function when a search is submitted', () => {
    const mockSubmit = jest.fn();
    const component = shallow(<SearchBar placeholder={'test'} handleSearch={mockSubmit} />);
    component.setState({ searchTerm: 'test' });
    component.find('form#ss-search-form').simulate('submit', { preventDefault: () => {} });
    expect(mockSubmit).toHaveBeenCalled();
  });
});
