import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('render main tag', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('main').hasClass('app')).toBe(true);
  });
});