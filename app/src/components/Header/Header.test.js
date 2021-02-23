import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('<Header />', () => {
  it('render title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header').contains('Reminder')).toBe(true);
  });
});