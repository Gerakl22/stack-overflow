import {Tags} from './Tags';

export class Question {
    key?: any;
    date: number;
    author: string | null | undefined;
    title: string;
    textarea: string;
    tags: Tags[];
    comments: object[];
    isApproval: boolean;
    isResolve: boolean;

    constructor(question: {
      key: string;
      date: number;
      author: string | null | undefined;
      title: string;
      textarea: string;
      tags: Tags[];
      comments: object[];
      isApproval: boolean;
      isResolve: boolean;
    })
    {
      this.key = question.key;
      this.date = question.date;
      this.author = question.author;
      this.title = question.title;
      this.textarea = question.textarea;
      this.tags = question.tags;
      this.comments = question.comments;
      this.isApproval = question.isApproval;
      this.isResolve = question.isResolve;
  }
}
