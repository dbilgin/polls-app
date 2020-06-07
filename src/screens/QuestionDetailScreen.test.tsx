import React from 'react';
import {shallow} from 'enzyme';
import {TouchableOpacity} from 'react-native';
import QuestionDetailScreen from './QuestionDetailScreen';

const createTestProps = () => ({
  route: {
    params: {
      questionId: 1,
    },
  },
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
});

jest.mock('../PollsService', () => ({
  voteQuestion: jest.fn(() => Promise.resolve({status: 201})),
}));

jest.mock('react-redux', () => ({
  useSelector: () => {
    return {
      id: 1,
      question: 'question',
      choices: [{choice: 'choice 1', url: 'url/1', votes: 0}],
      published_at: new Date(),
      url: '/url/1',
    };
  },
  useDispatch: () => jest.fn(),
}));

describe('QuestionAddScreen', () => {
  describe('Rendering', () => {
    let props: any;
    beforeEach(() => {
      props = createTestProps();
    });

    it('should match to snapshot', () => {
      const component = shallow(<QuestionDetailScreen {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});

describe('Interaction', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  it('should vote and go back', async () => {
    const component = shallow(<QuestionDetailScreen {...props} />);

    // @ts-ignore
    await component.find(TouchableOpacity).first().props().onPress();
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
