export class Call {

  public readonly params = new Array<any>();

  constructor(public method: string, ...params: any[]) {
    this.params = params;
  }
}