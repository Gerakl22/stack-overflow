import {Tags} from './Tags';

export class Question {
    $key?: string | null;
    date: number;
    author: string | null | undefined;
    title: string;
    textarea: string;
    tags: Tags[];

    constructor(question: {
      key: string | null;
      date: number;
      author: string | null | undefined;
      title: string;
      textarea: string;
      tags: Tags[]})
    {
      this.$key = question.key;
      this.date = question.date;
      this.author = question.author;
      this.title = question.title;
      this.textarea = question.textarea;
      this.tags = question.tags;
}
}
