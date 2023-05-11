export class ForgotPasswordRequest {
  email: string;
  resetUrl: string;

  constructor(email: string) {
    this.email = email;
    this.resetUrl = window.location.origin + '/auth/reset-password';
  }
}
