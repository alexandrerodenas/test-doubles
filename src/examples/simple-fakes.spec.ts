import { User, UserId } from "../domain/model/user";
import { Email } from "../domain/model/email";
import { CreateNewUser } from "../domain/usecases/create-new-user";
import { InMemoryUserRepository } from "../tests/fakes/in-memory-user-repository";
import { StaticUserIdProvider } from "../tests/fakes/static-user-id-provider";
import { v4 as uuidv4 } from 'uuid';
import { FrozenTimeProvider } from "../tests/fakes/frozen-time-provider";
import { NoopNotificationSender } from "../tests/dummies/noop-notification-sender";
import { NotificationSenderSpy } from "../tests/spies/notification-sender-spy";

describe("Can create a new user", () => {

  const aDummyUserId = uuidv4() as UserId;
  const aDummyDate = new Date();
  const aDummyUser = new User(
      aDummyUserId,
      "RegularUser",
      new Email("an-email@gmail.com"),
      aDummyDate
  )

  const inMemoryUserRepository = new InMemoryUserRepository([aDummyUser]);

  test("Given existing email, when creating user, then an error is thrown.", () => {
    const sut = new CreateNewUser(
        inMemoryUserRepository,
        new StaticUserIdProvider(aDummyUserId),
        new FrozenTimeProvider(aDummyDate),
        new NoopNotificationSender()
    );

    expect(
        () => sut.createRegularUser(aDummyUser.email)
    ).toThrow("User already exists");
  });


  test("Given non existing email, when creating user, then user is created with expected parameters.", () => {
    const email = new Email("non-existing@testdoubles.com");
    const notificationSenderSpy = new NotificationSenderSpy();
    const sut = new CreateNewUser(
        inMemoryUserRepository,
        new StaticUserIdProvider(aDummyUserId),
        new FrozenTimeProvider(aDummyDate),
        notificationSenderSpy
    );

    const createdUser = sut.createRegularUser(email);

    const expectedUser = new User(
        aDummyUserId,
        "RegularUser",
        email,
        aDummyDate
    );
    expect(createdUser).toEqual(expectedUser);
    expect(inMemoryUserRepository.existsByEmail(email)).toBeTruthy();
    expect(notificationSenderSpy.hasBeenCalledOnceWith("welcomeUser", expectedUser)).toBeTruthy()
  });
})