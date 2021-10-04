import { Command } from '@root/framework/processing/command';
import { AddAmountToBalanceDTO } from '@root/modules/account-balance/dtos/add-amount-to-balance.dto';

export const ADD_AMOUNT_TO_BALANCE_COMMAND = 'account-balance/add-amount-to-balance';

export class AddAmountToBalanceCommand extends Command<AddAmountToBalanceDTO> {
  constructor(payload: AddAmountToBalanceDTO) {
    super(ADD_AMOUNT_TO_BALANCE_COMMAND, payload);
  }
}
