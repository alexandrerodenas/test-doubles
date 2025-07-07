import { User } from "../model/user";

export interface NotificationSender {
  welcomeUser(newUser: User): void;
}