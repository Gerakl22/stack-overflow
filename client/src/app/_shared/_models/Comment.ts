export class Comment {
  key?: any;
  author: string | null | undefined;
  textarea: string;
  date: number;
  isBestComment: boolean;

  constructor(comment: { key: any; author: string | null | undefined; textarea: string; date: number; isBestComment: boolean }) {
    this.key = comment.key;
    this.author = comment.author;
    this.textarea = comment.textarea;
    this.date = comment.date;
    this.isBestComment = comment.isBestComment;
  }
}
