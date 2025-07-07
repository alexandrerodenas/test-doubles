export type UUID = string;

export interface UUIDProvider {
  invoke(): UUID;
}