export interface Login {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
