import { CreditCard, Payment } from '../types';

export const validVisa: Payment = {
  cardNumber: '4242424242424242',
  expiryDate: '12 / 27',
  securityCode: '123',
  nameOnCard: 'Bogus Gateway',
  type: CreditCard.Visa
};

