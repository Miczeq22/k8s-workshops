/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class DomainSubscriber<PayloadType extends object> {
  constructor(public readonly name: string) {}

  public abstract setup(): void;
}
