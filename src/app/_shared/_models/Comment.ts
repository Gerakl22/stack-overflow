export class Comment {
  key?: any;
  name?: string;
  author: string | null | undefined;
  textarea: string;
  date: number;
  isBestComment: boolean;

  constructor(comment: {
    key: any;
    name: string;
    author: string | null | undefined;
    textarea: string;
    date: number;
    isBestComment: boolean;
    })
    {
    this.key = comment.key;
    this.name = comment.name;
    this.author = comment.author;
    this.textarea = comment.textarea;
    this.date = comment.date;
    this.isBestComment = comment.isBestComment;
  }
}
