import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import axios from 'axios';
import store from '../../store';
import { CardModal } from 'components';
import { fetchOneTask } from 'actions';
import { default as testData } from 'test/testData';

const wrapping = (component) => {
  return (
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('<CardModal />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(wrapping(<CardModal id={72} />));
  });

  it('render main title', () => {
    const $title = wrapper.find('.card-modal-name');
    expect($title.text().includes('Task Description')).toBe(true);
  });

  it('render task values', () => {
    axios.get = jest.fn().mockImplementation(url => {
      return new Promise(resolve => {
        switch (url) {
          case '/api/reminder/task/':
            resolve({ data: testData });
            break;
          case '/api/reminder/task/72/':
            resolve({ data: testData[0] });
            break;
        }
      });
    });

    wrapper.props().store.dispatch(fetchOneTask('72')).then(() => {
      wrapper.update();

      const $title = wrapper.find('ForwardRef[name="title"]');
      const $task_date = wrapper.find('ForwardRef[name="task_date"]');
      const $alarm = wrapper.find('ForwardRef[name="alarm"]');
      const $description = wrapper.find('ForwardRef[name="description"]');

      expect(
        $title.props().value === '더미 데이터 1번' &&
        $task_date.props().value === '2021-02-27' &&
        $alarm.props().value === undefined &&
        $description.props().value === '안녕하세요'
      ).toBe(true);
    });
  });

  it('save button test', () => {
    axios.put = jest.fn().mockImplementation((_, data) => {
      return new Promise(resolve => {
        resolve({ data: data });
      });
    });
    
    wrapper.find('.modal-button').at(0).simulate('dblclick');

    const data = new FormData();
    data.append('title', '더미 데이터 1번');
    data.append('task_date', '2021-02-27');
    data.append('alarm', '');
    data.append('description', '안녕하세요');

    expect(axios.put).toHaveBeenCalledWith('/api/reminder/task/72/', data);
  });

  it('delete button test', () => {
    axios.delete = jest.fn().mockImplementation(_ => {
      return new Promise(resolve => {
        resolve();
      });
    });

    wrapper.find('.modal-button').at(1).simulate('dblclick');

    expect(axios.delete).toHaveBeenCalledWith('/api/reminder/task/72/');
  });
});
