import { Call } from "./calls";

export abstract class CustomSpy {
  protected calls: Array<Call> = [];

  hasBeenCalledNTimes(method: string, times: number): boolean {
    return this.calls.filter(call => call.method === method).length === times;
  }

  hasBeenCalledWith(method: string, params: any[]){
    return this.calls.filter(call => call.method === method)
    .some(call => this.argumentsMatch(call.params, params));
  }

  hasBeenCalledOnceWith(method: string, ...params: any[]){
    return this.hasBeenCalledNTimes(method, 1) && this.hasBeenCalledWith(method, [...params]);
  }

  private argumentsMatch(actual: any[], expected: any[]): boolean {
    if (actual.length !== expected.length) return false;

    return actual.every((arg, index) => {
      const expectedArg = expected[index];

      if (typeof arg === 'object' && typeof expectedArg === 'object') {
        return JSON.stringify(arg) === JSON.stringify(expectedArg);
      }

      return arg === expectedArg;
    });
  }
}