import { IEncrypt } from '@/modules/encrypt/domain/encrypt.interface'
import { Injectable } from '@nestjs/common'
import { createHash } from 'crypto'

@Injectable()
export class EncryptService implements IEncrypt {
  sha256(value: string): string {
    return createHash('sha256').update(value).digest('hex')
  }
}
