import {QuestionActionTypes} from './reducers/questions';
import {Question} from '../Models/Question';
import {getQuestions} from '../PollsService';
import {Dispatch} from 'redux';
import {AxiosError} from 'axios';

export function fetchQuestion(page: number) {
  return (dispatch: Dispatch) => {
    dispatch(fetchQuestionAction());
    return getQuestions(page)
      .then((result) => dispatch(fetchQuestionSuccess(result.data, page)))
      .catch((error: AxiosError) => dispatch(fetchQuestionFailure(error)));
  };
}

export function fetchQuestionAction(): FetchQuestionAction {
  return {
    type: QuestionActionTypes.FETCH_QUESTION,
  };
}

export function fetchQuestionSuccess(
  question: Question,
  page: number,
): FetchQuestionSuccessAction {
  return {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
    question: question,
    page: page,
  };
}

export function fetchQuestionFailure(
  error: AxiosError,
): FetchQuestionFailureAction {
  return {
    type: QuestionActionTypes.FETCH_QUESTION_FAILURE,
    error: error,
  };
}

interface FetchQuestionAction {
  type: QuestionActionTypes.FETCH_QUESTION;
}

interface FetchQuestionSuccessAction {
  type: QuestionActionTypes.FETCH_QUESTION_SUCCESS;
  question: Question;
  page: number;
}

interface FetchQuestionFailureAction {
  type: QuestionActionTypes.FETCH_QUESTION_FAILURE;
  error: AxiosError;
}

export type QuestionActions =
  | FetchQuestionAction
  | FetchQuestionSuccessAction
  | FetchQuestionFailureAction;
