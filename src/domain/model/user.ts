import { Email } from "./email";
import { isBlank } from "../../utils/string-utils";

export type UserId = string & { __brand: 'UserId' };
export type Role = "Administrator" | "RegularUser";

export class User {
  public constructor(
      public readonly id: UserId,
      public readonly role: Role,
      public readonly email: Email,
      public readonly creationDate: Date
  ) {
    if(isBlank(id)){
      throw new Error("User id must be defined");
    }
    if(!role){
      throw new Error("Role must be defined");
    }
    if(!email){
      throw new Error("Email must be defined");
    }
    if(!creationDate){
      throw new Error("Creation date must be defined");
    }
  }
}