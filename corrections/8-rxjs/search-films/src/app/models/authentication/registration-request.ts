export class RegistrationRequest {
  constructor(
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string
  ) {}
}
