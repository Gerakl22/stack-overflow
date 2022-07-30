export class Tags {
  id: string;
  value: any;
  item: any;

  constructor(tags: { id: string; value: any; item: any }) {
    this.id = tags.id;
    this.value = tags.value;
    this.item = tags.item;
  }
}
