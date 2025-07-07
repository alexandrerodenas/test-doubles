import { User } from "../../domain/model/user";
import { UserRepository } from "../../domain/services/repositories/user-repository";
import { Email } from "../../domain/model/email";

export class InMemoryUserRepository implements UserRepository {
  private readonly users: Array<User> = [];

  constructor(users: Array<User> = []) {
    this.users = users;
  }

  existsByEmail(email: Email): boolean {
    return this.users
        .map(_ => _.email.value)
        .some(_ => _ === email.value);
  }

  save(user: User): User {
    this.users.push(user);
    return user;
  }

}