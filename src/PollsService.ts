import axios from 'axios';

const api = axios.create({
  baseURL: 'https://polls.apiblueprint.org/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuestions = (page: number = 1) => {
  return api.get(`questions/${page}`);
};

export const voteQuestion = (questionId: number, choiceId: number) => {
  return api.post(`questions/${questionId}/choices/${choiceId}`);
};

export const addQuestion = (title: string, chocies: string[]) => {
  return api.post('questions', {question: title, choices: chocies});
};
