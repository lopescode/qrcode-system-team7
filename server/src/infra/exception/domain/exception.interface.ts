export interface IFormatExceptionMessage {
  message: string
  code_error?: number
}

export interface IException {
  badRequestException(data: IFormatExceptionMessage): void
  internalServerErrorException(data?: IFormatExceptionMessage): void
  forbiddenException(data?: IFormatExceptionMessage): void
  unauthorizedException(data?: IFormatExceptionMessage): void
  notFoundException(data?: IFormatExceptionMessage): void
  conflictException(data?: IFormatExceptionMessage): void
}
