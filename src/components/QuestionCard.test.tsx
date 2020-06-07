import React from 'react';
import {shallow} from 'enzyme';
import QuestionCard from './QuestionCard';
import {Question} from '../../Models/Question';
import {SafeAreaView, TouchableOpacity, View, Image, Text} from 'react-native';

const createTestProps = () => ({
  navigation: {
    navigate: jest.fn(),
  },
  image: require('../images/1.png'),
});

describe('QuestionCard', () => {
  describe('Rendering', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps();
    });

    it('should match to snapshot', () => {
      const question: Question = {
        id: 1,
        question: 'question',
        choices: [],
        published_at: new Date(),
        url: '/url',
      };

      const component = shallow(<QuestionCard q={question} {...props} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('UI Placements', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps();
    });

    it('should have correct count of components', () => {
      const question: Question = {
        id: 1,
        question: 'question',
        choices: [],
        published_at: new Date(),
        url: '/url',
      };

      const component = shallow(<QuestionCard q={question} {...props} />);

      expect(component.find(SafeAreaView).length).toBe(1);
      expect(component.find(TouchableOpacity).length).toBe(1);
      expect(component.find(Image).length).toBe(1);
      expect(component.find(View).length).toBe(1);
      expect(component.find(Text).length).toBe(4);
    });
  });

  describe('Interaction', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps();
    });

    it('should navigate', async () => {
      const question: Question = {
        id: 1,
        question: 'question',
        choices: [],
        published_at: new Date(),
        url: '/url',
      };

      const component = shallow(<QuestionCard q={question} {...props} />);

      // @ts-ignore
      await component.find(TouchableOpacity).first().props().onPress();
      expect(props.navigation.navigate).toHaveBeenCalled();
    });

    it('should not navigate', async () => {
      const question: Question = {
        question: 'question',
        choices: [],
        published_at: new Date(),
        url: '/url',
      };

      const component = shallow(<QuestionCard q={question} {...props} />);

      // @ts-ignore
      await component.find(TouchableOpacity).first().props().onPress();
      expect(props.navigation.navigate).not.toHaveBeenCalled();
    });
  });
});
