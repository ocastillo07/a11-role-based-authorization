export enum Role {
  User = 'User',
  Admin = 'Admin'
}

export interface User {
  // id?: number;
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
  role: Role;
  token?: string;
}