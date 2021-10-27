export class UserResponse {
  constructor(
    public user: UserResponse,
    public token: string
  ) {}
}

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    /* eslint-disable @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match */
    public created_at: string,
    public update_at: string
  ) {}
}
