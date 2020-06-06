import {Choice} from './Choice';

export class Question {
  id?: number;
  question: string;
  published_at: Date;
  url: string;
  choices: Choice[];

  constructor(
    question: string,
    published_at: Date,
    url: string,
    choices: Choice[],
  ) {
    this.question = question;
    this.published_at = published_at;
    this.url = url;
    this.choices = choices;
  }
}
