export class QuestionsStatus {
  id: string;
  item: string;

  constructor(status: { id: string; item: string }) {
    this.id = status.id;
    this.item = status.item;
  }
}
