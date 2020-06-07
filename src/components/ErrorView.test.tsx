import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorView from './ErrorView';

Enzyme.configure({adapter: new Adapter()});

describe('ErrorView', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<ErrorView />);
      expect(component).toMatchSnapshot();
    });
  });
});
