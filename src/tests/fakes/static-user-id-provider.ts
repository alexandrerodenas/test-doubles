import { UUID, UUIDProvider } from "../../domain/services/uuid-provider";
import { UserId } from "../../domain/model/user";

export class StaticUserIdProvider implements UUIDProvider {

  constructor(private readonly userId: UserId) {
  }

  invoke(): UUID {
    return this.userId;
  }

}