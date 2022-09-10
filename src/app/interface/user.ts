import { Address } from './address';
import { Company } from './company';

export interface User {
  id?: number;
  name: string;
  username: string;
  image?: string;
  isAdmin?: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
