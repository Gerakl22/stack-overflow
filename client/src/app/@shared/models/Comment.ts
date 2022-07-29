export class Comment {
  id?: string;
  author: string;
  textarea: string;
  date: number;
  isBestComment: boolean;

  constructor(comment: { id: string; author: string; textarea: string; date: number; isBestComment: boolean }) {
    this.id = comment.id;
    this.author = comment.author;
    this.textarea = comment.textarea;
    this.date = comment.date;
    this.isBestComment = comment.isBestComment;
  }
}
