export class QuestionsDisplay {
  id: string;
  name: string;
  checked: boolean;

  constructor(theme: { checked: boolean; name: string; id: string }) {
    this.id = theme.id;
    this.name = theme.name;
    this.checked = theme.checked;
  }
}
