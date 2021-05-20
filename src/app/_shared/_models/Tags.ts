export class Tags {
  id: string;
  item: any;

  constructor(tags: {
    item: any;
    id: string; }) {
    this.id = tags.id;
    this.item = tags.item;
  }
}
