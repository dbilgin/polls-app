import {Choice} from './Choice';

export interface Question {
  id?: number;
  question: string;
  published_at: Date;
  url: string;
  choices: Choice[];
}
