export interface CurrentUser {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    photo: string;
  };
}
