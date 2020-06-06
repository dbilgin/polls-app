import {Reducer} from 'redux';
import {Question} from '../../../Models/Question';
import {QuestionActions} from '../actions';
import {AxiosError} from 'axios';

export interface QuestionState {
  questions: Question[];
  isFetching: boolean;
  error?: AxiosError;
}

const initialQuestionState: QuestionState = {
  questions: [],
  isFetching: false,
};

export enum QuestionActionTypes {
  FETCH_QUESTION = 'FETCH_QUESTION',
  FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS',
  FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE',
  UPDATE_VOTE_WITH_URL = 'UPDATE_VOTE_WITH_URL',
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
        error: undefined,
      };
    case QuestionActionTypes.FETCH_QUESTION_SUCCESS:
      // Check if the previous pages are already loaded
      if (
        action.page > 1 &&
        !state.questions.find((x) => x.id === action.page - 1)
      ) {
        return state;
      }

      let newQuestions = [...state.questions];
      if (!state.questions.find((x) => x.url === action.question!.url)) {
        action.question.id = action.page;
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
    case QuestionActionTypes.UPDATE_VOTE_WITH_URL:
      let voteUpdatedQuesitons = [...state.questions];
      for (const question of voteUpdatedQuesitons) {
        if (question.id === action.questionId) {
          for (const choice of question.choices) {
            if (choice.url === action.voteUrl) {
              choice.votes++;
            }
          }
          break;
        }
      }
      return {
        ...state,
        questions: voteUpdatedQuesitons,
      };
    default:
      return state;
  }
};
