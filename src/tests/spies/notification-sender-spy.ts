import { NotificationSender } from "../../domain/services/notification-sender";
import { User } from "../../domain/model/user";
import { Call } from "./calls";
import { CustomSpy } from "./custom-spy";

export class NotificationSenderSpy extends CustomSpy implements NotificationSender {

  welcomeUser(newUser: User): void {
    this.calls.push(
      new Call(this.welcomeUser.name, newUser)
    );
  }

}