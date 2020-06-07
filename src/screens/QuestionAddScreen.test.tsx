import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionAddScreen from './QuestionAddScreen';
import {TouchableOpacity, TextInput} from 'react-native';

Enzyme.configure({adapter: new Adapter()});

const createTestProps = () => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
});

jest.mock('../PollsService', () => ({
  addQuestion: jest.fn(() =>
    Promise.resolve({status: 201, data: {url: 'url/1'}}),
  ),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('QuestionAddScreen', () => {
  describe('Rendering', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps();
    });

    it('should match to snapshot', () => {
      const component = shallow(<QuestionAddScreen {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Interaction', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  it('should call add new choice field', () => {
    const component = shallow(<QuestionAddScreen {...props} />);
    expect(component.find('TextInput').length).toBe(1);
    // @ts-ignore
    component.find(TouchableOpacity).first().props().onPress();
    expect(component.find('TextInput').length).toBe(2);
  });

  it('should not save without filling in', () => {
    const component = shallow(<QuestionAddScreen {...props} />);

    // @ts-ignore
    component.find(TouchableOpacity).at(1).props().onPress();
    expect(props.navigation.goBack).not.toHaveBeenCalled();
  });

  it('adding process should work', async () => {
    const component = shallow(<QuestionAddScreen {...props} />);

    // @ts-ignore
    await component.find(TouchableOpacity).first().props().onPress();
    // @ts-ignore
    await component.find(TouchableOpacity).first().props().onPress();

    component.find(TextInput).at(0).simulate('changeText', 'Test Test');
    component.find(TextInput).at(1).simulate('changeText', 'Test Test');
    component.find(TextInput).at(2).simulate('changeText', 'Test Test');

    expect(component.find(TouchableOpacity).length).toBe(2);
    expect(component.find(TextInput).length).toBeGreaterThan(2);
  });
});
