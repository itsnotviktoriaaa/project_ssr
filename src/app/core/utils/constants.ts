export class Constants {
  public static readonly regExpForPassword: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
}
