export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse extends IUser {
  _id: string;
  token: string | null;
  role: "ADMIN" | "USER";
  message?: string;
}
