import { Exceptions } from './exceptionsHelper';

export class ExceptionClass {
  constructor(readonly exception: Exceptions, readonly message?: string) {}
}
