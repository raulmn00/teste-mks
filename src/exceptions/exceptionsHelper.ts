import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { IException } from './IException';

export enum Exceptions {
  InvalidData,
  DatabaseException,
  NotFoundData,
  UnauthorizedException,
}

export function handleException({ message, exception }: IException) {
  if (
    exception === Exceptions.InvalidData ||
    exception === Exceptions.NotFoundData
  ) {
    throw new BadRequestException(message);
  }
  if (exception === Exceptions.DatabaseException) {
    throw new InternalServerErrorException(
      message ? message : 'Error in database.',
    );
  }
  if (exception === Exceptions.UnauthorizedException) {
    throw new UnauthorizedException(
      message ? message : 'You not have permission to make this action.',
    );
  }
}
