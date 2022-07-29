export interface ILogin {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
