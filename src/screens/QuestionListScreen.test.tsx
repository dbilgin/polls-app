import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import QuestionListScreen from './QuestionListScreen';
import QuestionCard from '../components/QuestionCard';
import Swiper from 'react-native-swiper';

Enzyme.configure({adapter: new Adapter()});

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
          published_at: new Date(),
          url: '/url/1',
        },
        {
          id: 2,
          question: 'question',
          choices: [{choice: 'choice 1', url: 'url/1', votes: 0}],
          published_at: new Date(),
          url: '/url/2',
        },
      ],
      isFetching: false,
      error: undefined,
    };
  },
  useDispatch: () => jest.fn(),
}));

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
