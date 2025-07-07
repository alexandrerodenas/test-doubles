import { TimeProvider } from "../../domain/services/time-provider";

export class EpochTimeProvider implements TimeProvider {
  now(): Date {
    return new Date(1970, 1, 1, 0, 0, 0);
  }
}