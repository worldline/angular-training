import { User } from './user'

export class UserResponse {
  constructor(
    public user: User,
    public token: string
  ) {}
}
