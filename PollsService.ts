import axios from 'axios';

const api = axios.create({
  baseURL: 'https://polls.apiblueprint.org/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getQuestion = (page: number) => api.get(`questions/${page}`);
