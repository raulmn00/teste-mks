import { Exceptions } from './exceptionsHelper';

export interface IException {
  message?: string;
  exception: Exceptions;
}
