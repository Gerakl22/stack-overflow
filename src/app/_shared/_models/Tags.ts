export class Tags {
  id: string;
  item: string;

  constructor(tags: {
    item: string;
    id: string; }) {
    this.id = tags.id;
    this.item = tags.item;
  }
}
