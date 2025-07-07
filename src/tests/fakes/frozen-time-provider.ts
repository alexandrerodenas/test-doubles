import { TimeProvider } from "../../domain/services/time-provider";

export class FrozenTimeProvider implements TimeProvider {

  constructor(private frozenDate: Date) {
  }

  now(): Date {
    return this.frozenDate;
  }


}