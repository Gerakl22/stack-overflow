export class Theme {
  id: string;
  name: string;
  properties: any;
  checked: boolean;

  constructor(theme: { checked: boolean; properties: any; name: string; id: string }) {
    this.id = theme.id;
    this.name = theme.name;
    this.properties = theme.properties;
    this.checked = theme.checked;
  }
}
