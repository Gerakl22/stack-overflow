export class QuestionsTime {
  id: string;
  item: string;
  value: string;

  constructor(time: { value: string; id: string; item: string }) {
    this.id = time.id;
    this.item = time.item;
    this.value = time.value;
  }
}
