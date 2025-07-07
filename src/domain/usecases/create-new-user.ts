import { User, UserId } from "../model/user";
import { UserRepository } from "../services/repositories/user-repository";
import { Email } from "../model/email";
import { UUIDProvider } from "../services/uuid-provider";
import { TimeProvider } from "../services/time-provider";
import { NotificationSender } from "../services/notification-sender";

export class CreateNewUser {

  constructor(
      private readonly userRepository: UserRepository,
      private readonly userIdProvider: UUIDProvider,
      private readonly timeProvider: TimeProvider,
      private readonly notificationSender: NotificationSender
  ) {
  }

  public createRegularUser(email: Email): User {
    if (this.userRepository.existsByEmail(email)) {
      throw new Error("User already exists");
    }

    const newUser = this.userRepository.save(
        new User(
            this.userIdProvider.invoke() as UserId,
            "RegularUser",
            email,
            this.timeProvider.now()
        )
    );

    this.notificationSender.welcomeUser(newUser);

    return newUser;
  }
}