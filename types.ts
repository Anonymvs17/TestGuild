export interface ProductData {
  name: string;
  price: string;
  tax?: string;
  total?: string;
  image?: string;
  quantity?: number;
}

export interface AddressData {
  firstName: string;
  lastName: string;
  postcode: string;
}

export interface Payment {
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  nameOnCard: string;
  type?: CreditCard;
}

export enum CreditCard {
  Mastercard = 'MasterCard',
  Visa = 'Visa',
}

export interface UserAuth {
 username: string;
 password: string;
}