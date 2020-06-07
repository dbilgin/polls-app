import {questions, QuestionActionTypes} from './questions';
import {Question} from '../../../Models/Question';
import {AxiosError, AxiosRequestConfig} from 'axios';

const mockQuestion: Question = {
  id: 1,
  question: 'question',
  choices: [{choice: 'choice 1', url: 'url/1', votes: 0}],
  published_at: new Date('2020-06-07T18:21:01.371Z'),
  url: '/url/1',
};

const initialState = {
  questions: [],
  isFetching: false,
  error: undefined,
};

const filledInitialState = {
  questions: [mockQuestion],
  isFetching: false,
  error: undefined,
};

describe('todos reducer', () => {
  it('should handle FETCH_QUESTION', () => {
    expect(
      questions(initialState, {
        type: QuestionActionTypes.FETCH_QUESTION,
      }),
    ).toEqual({
      questions: [],
      isFetching: true,
      error: undefined,
    });
  });

  it('should handle FETCH_QUESTION_SUCCESS', () => {
    expect(
      questions(initialState, {
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
        page: 1,
        question: mockQuestion,
      }),
    ).toEqual({
      questions: [mockQuestion],
      isFetching: false,
      error: undefined,
    });
  });

  it('should handle FETCH_QUESTION_FAILURE', () => {
    const mockConfig: AxiosRequestConfig = {};
    const mockError: AxiosError = {
      name: '',
      message: '',
      config: mockConfig,
      isAxiosError: true,
      toJSON: jest.fn(),
    };
    expect(
      questions(initialState, {
        type: QuestionActionTypes.FETCH_QUESTION_FAILURE,
        error: mockError,
      }),
    ).toEqual({
      questions: [],
      isFetching: false,
      error: mockError,
    });
  });

  it('should handle UPDATE_VOTE_WITH_URL', () => {
    let voteUpdatedQuestion = mockQuestion;
    voteUpdatedQuestion.choices[0].votes = 1;

    expect(
      questions(filledInitialState, {
        type: QuestionActionTypes.UPDATE_VOTE_WITH_URL,
        questionId: 1,
        voteUrl: 'url/1',
      }),
    ).toEqual({
      questions: [voteUpdatedQuestion],
      isFetching: false,
      error: undefined,
    });
  });
});
