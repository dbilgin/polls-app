import {Reducer} from 'redux';
import {QuestionActions} from '../actions';
import {Question} from '../../Models/Question';

export interface QuestionState {
  questions: Question[];
  isFetching: boolean;
  error?: Error;
}

const initialQuestionState: QuestionState = {
  questions: [],
  isFetching: false,
};

export enum QuestionActionTypes {
  FETCH_QUESTION = 'FETCH_QUESTION',
  FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS',
  FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE',
}

export const questions: Reducer<QuestionState, QuestionActions> = (
  state = initialQuestionState,
  action,
) => {
  switch (action.type) {
    case QuestionActionTypes.FETCH_QUESTION:
      return {
        ...state,
        isFetching: true,
      };
    case QuestionActionTypes.FETCH_QUESTION_SUCCESS:
      let newQuestions = [...state.questions];
      if (!state.questions.find((x) => x.url === action.question.url)) {
        newQuestions.push(action.question);
      }

      return {
        ...state,
        questions: newQuestions,
        isFetching: false,
        error: undefined,
      };
    case QuestionActionTypes.FETCH_QUESTION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
