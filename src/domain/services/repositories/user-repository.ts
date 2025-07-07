import { User } from "../../model/user";
import { Email } from "../../model/email";

export interface UserRepository {
  save(user: User): User;

  existsByEmail(email: Email): boolean;
}