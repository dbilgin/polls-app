import React from 'react';
import {shallow} from 'enzyme';
import QuestionCard from './QuestionCard';
import {Question} from '../../Models/Question';

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const question: Question = {
        id: 1,
        question: 'question',
        choices: [],
        published_at: new Date(),
        url: '/url',
      };

      const component = shallow(
        <QuestionCard q={question} image={require('../images/1.png')} />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
