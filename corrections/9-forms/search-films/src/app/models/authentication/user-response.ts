export class UserResponse {
  constructor(public user: UserResponse, public token: string) {}
}

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public created_at: string,
    public update_at: string
  ) {}
}
