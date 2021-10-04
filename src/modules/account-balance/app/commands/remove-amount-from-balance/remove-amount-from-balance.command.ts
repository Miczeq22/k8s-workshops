import { Command } from '@root/framework/processing/command';
import { RemoveAmountFromBalanceDTO } from '@root/modules/dtos/remove-amount-from-balance.dto';

export const REMOVE_AMOUNT_FROM_BALANCE_COMMAND = 'account-balance/remove-amount-from-balance';

export class RemoveAmountFromBalanceCommand extends Command<RemoveAmountFromBalanceDTO> {
  constructor(payload: RemoveAmountFromBalanceDTO) {
    super(REMOVE_AMOUNT_FROM_BALANCE_COMMAND, payload);
  }
}
