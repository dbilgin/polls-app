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
