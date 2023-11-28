import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'
import { IEncrypt } from './domain/encrypt.interface'

@Injectable()
export class EncryptService implements IEncrypt {
  sha256(value: string): string {
    return createHash('sha256').update(value).digest('hex')
  }
}
