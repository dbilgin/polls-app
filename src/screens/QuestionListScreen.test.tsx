import React from 'react';
import {shallow} from 'enzyme';
import {TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import QuestionListScreen from './QuestionListScreen';
import QuestionCard from '../components/QuestionCard';
import Swiper from 'react-native-swiper';

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
      questions: [
        {
          id: 1,
          question: 'question',
          choices: [{choice: 'choice 1', url: 'url/1', votes: 0}],
          published_at: new Date('2020-06-07T18:21:01.371Z'),
          url: '/url/1',
        },
        {
          id: 2,
          question: 'question',
          choices: [{choice: 'choice 1', url: 'url/1', votes: 0}],
          published_at: new Date('2020-06-07T18:21:01.371Z'),
          url: '/url/2',
        },
      ],
      isFetching: false,
      error: undefined,
    };
  },
  useDispatch: () => jest.fn(),
}));

describe('Rendering', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  it('should match to snapshot', () => {
    const component = shallow(<QuestionListScreen {...props} />);
    expect(component).toMatchSnapshot();
  });
});

describe('UI Placements', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  it('Data available - correct count of components', async () => {
    const component = shallow(<QuestionListScreen {...props} />);
    expect(component.find(TouchableOpacity).length).toBe(1);
    expect(component.find(ActivityIndicator).length).toBe(0);
    expect(component.find(QuestionCard).length).toBe(2);
    expect(component.find(Swiper).length).toBe(1);
    expect(component.find(SafeAreaView).length).toBe(1);
  });
});

describe('Interactions', () => {
  let props: any;
  beforeEach(() => {
    props = createTestProps();
  });

  it('Navigation', async () => {
    const component = shallow(<QuestionListScreen {...props} />);

    // @ts-ignore
    await component.find(TouchableOpacity).first().props().onPress();
    expect(props.navigation.navigate).toHaveBeenCalled();
  });
});
