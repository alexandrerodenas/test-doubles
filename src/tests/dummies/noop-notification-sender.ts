import { NotificationSender } from "../../domain/services/notification-sender";
import { User } from "../../domain/model/user";

export class NoopNotificationSender implements NotificationSender {
  welcomeUser(newUser: User): void {
  }
}