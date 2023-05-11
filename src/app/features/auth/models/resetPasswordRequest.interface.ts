export class ResetPasswordRequest {
  password: string;
  resetToken: string;

  constructor(password: string, resetToken: string) {
    this.password = password;
    this.resetToken = resetToken;
  }
}
