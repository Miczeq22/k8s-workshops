import { PasswordHashProviderService } from '@root/modules/shared-kernel/core/account-password/password-hash-provider.service';
import * as bcrypt from 'bcrypt';

export class PasswordHashProviderServiceImpl implements PasswordHashProviderService {
  public async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async isValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
