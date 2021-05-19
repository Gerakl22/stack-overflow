import {Tags} from './Tags';

export class Question {
    id?: string | null;
    date: number;
    author: string | null | undefined;
    title: string;
    textarea: string;
    tags: Tags[];

    constructor(question: {
      id: string | null;
      date: number;
      author: string | null | undefined;
      title: string;
      textarea: string;
      tags: Tags[]})
    {
      this.id = question.id;
      this.date = question.date;
      this.author = question.author;
      this.title = question.title;
      this.textarea = question.textarea;
      this.tags = question.tags;
}
}
