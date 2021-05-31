export class Theme {
  id: string;
  name: string;
  properties: any;

  constructor(theme: {
    properties: any;
    name: string;
    id: string;
  }) {
    this.id = theme.id;
    this.name = theme.name;
    this.properties = theme.properties;
  }
}
