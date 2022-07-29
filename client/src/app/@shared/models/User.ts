export class User {
  id: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;

  constructor(id: string, email: string, role: string, accessToken: string, refreshToken: string) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
