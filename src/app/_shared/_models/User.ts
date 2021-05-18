export class User {
  email: string;

  constructor(user: {
    email: string;
  }) {
    this.email = user.email;
  }
}
