export class Comment {
  key?: any;
  id?: string;
  author: string;
  textarea: string;
  date: number;
  isBestComment: boolean;

  constructor(comment: { key: any; author: string; textarea: string; date: number; isBestComment: boolean }) {
    this.key = comment.key;
    this.author = comment.author;
    this.textarea = comment.textarea;
    this.date = comment.date;
    this.isBestComment = comment.isBestComment;
  }
}
