export class QuestionsStatus {
  id: string;
  item: string;
  value: string;

  constructor(status: { id: string; value: string }) {
    this.id = status.id;
    this.value = status.value;
  }
}
