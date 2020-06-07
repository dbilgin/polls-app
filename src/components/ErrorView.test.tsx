import React from 'react';
import {shallow} from 'enzyme';
import ErrorView from './ErrorView';

describe('ErrorView', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<ErrorView />);
      expect(component).toMatchSnapshot();
    });
  });
});
