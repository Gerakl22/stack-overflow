export class QuestionsTime {
  id: string;
  item: string;
  value: string | null;

  constructor(time: { value: string | null; id: string; item: string }) {
    this.id = time.id;
    this.item = time.item;
    this.value = time.value;
  }
}
