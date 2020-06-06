export class Choice {
  choice: string;
  url: string;
  votes: number;

  constructor(choice: string, url: string, votes: number) {
    this.choice = choice;
    this.url = url;
    this.votes = votes;
  }
}
