import { Tags } from './Tags';
import { Comment } from './Comment';

export class Question {
  key?: any;
  date: number;
  author: string | null | undefined;
  title: string;
  textarea: string;
  tags: Tags[];
  comments: Comment[];
  isApproval: boolean;

  constructor(question: {
    key: any;
    date: number;
    author: string | null | undefined;
    title: string;
    textarea: string;
    tags: Tags[];
    comments: Comment[];
    isApproval: boolean;
  }) {
    this.key = question.key;
    this.date = question.date;
    this.author = question.author;
    this.title = question.title;
    this.textarea = question.textarea;
    this.tags = question.tags;
    this.comments = question.comments;
    this.isApproval = question.isApproval;
  }
}
