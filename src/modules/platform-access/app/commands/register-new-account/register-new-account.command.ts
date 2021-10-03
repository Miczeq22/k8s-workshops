import { Command } from '@root/framework/processing/command';
import { RegisterNewAccountDTO } from '@root/modules/platform-access/dtos/register-new-account.dto';

export const REGISTER_NEW_ACCOUNT_COMMAND = 'platform-access/register-new-account';

export class RegisterNewAccountCommand extends Command<RegisterNewAccountDTO> {
  constructor(payload: RegisterNewAccountDTO) {
    super(REGISTER_NEW_ACCOUNT_COMMAND, payload);
  }
}
