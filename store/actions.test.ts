import {QuestionActionTypes} from './reducers/questions';
import {fetchQuestion} from './actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('axios', () => jest.requireActual('../__mocks__/axios'));

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates FETCH_QUESTION_SUCCESS after fetching question', () => {
    const expectedActions = [
      {type: QuestionActionTypes.FETCH_QUESTION},
      {
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
        question: {},
        page: 1,
      },
    ];

    const store = mockStore({questions: []});

    // @ts-ignore
    return store.dispatch(fetchQuestion(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
