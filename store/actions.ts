import {QuestionActionTypes} from './reducers/questions';
import {Question} from '../Models/Question';
import {getQuestion} from '../PollsService';
import {Dispatch} from 'redux';

export function fetchQuestion(page: number) {
  (dispatch: Dispatch) => {
    getQuestion(page)
      .then((result) => dispatch(fetchQuestionSuccess(result.data)))
      .catch((error: Error) => dispatch(fetchQuestionFailure(error)));
  };
  return {
    type: QuestionActionTypes.FETCH_QUESTION,
  };
}

export function fetchQuestionSuccess(question: Question) {
  return {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
    question: question,
  };
}

export function fetchQuestionFailure(error: Error) {
  return {
    type: QuestionActionTypes.FETCH_QUESTION_FAILURE,
    error: error,
  };
}

export interface FetchQuestionSuccessAction {
  type: QuestionActionTypes.FETCH_QUESTION_SUCCESS;
  question: Question;
}

export interface FetchQuestionFailureAction {
  type: QuestionActionTypes.FETCH_QUESTION_FAILURE;
  error: Error;
}

export type QuestionActions =
  | FetchQuestionSuccessAction
  | FetchQuestionFailureAction;
