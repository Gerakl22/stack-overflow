export class Theme {
  id: string;
  item: string;

  constructor(theme: {
    item: string;
    id: string;
  }) {
    this.id = theme.id;
    this.item = theme.item;
  }
}
