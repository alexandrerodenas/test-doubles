import { isBlank } from "../../utils/string-utils";

export class Email {

  constructor(public readonly value: string) {
    if (isBlank(value)) {
      throw new Error("Email cannot be null or blank.");
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
      throw new Error("Invalid email format.")
    }
  }

}