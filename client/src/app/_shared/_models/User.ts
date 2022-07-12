export class User {
  email: string | null;
  isAdmin: boolean;

  constructor(user: { isAdmin: boolean; email: string | null }) {
    this.email = user.email;
    this.isAdmin = user.isAdmin;
  }
}
