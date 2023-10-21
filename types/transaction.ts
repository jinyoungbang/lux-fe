export interface Location {
  address: string | null;
  city: string | null;
  country: string | null;
  lat: number | null;
  lon: number | null;
  postal_code: string | null;
  region: string | null;
  store_number: string | null;
}

export interface PaymentMeta {
  by_order_of: string | null;
  payee: string | null;
  payer: string | null;
  payment_method: string | null;
  payment_processor: string | null;
  ppd_id: string | null;
  reason: string | null;
  reference_number: string | null;
}

export interface PersonalFinanceCategory {
  confidence_level: string;
  detailed: string;
  primary: string;
}

export interface TransactionData {
  account_id: string;
  account_owner: string | null;
  amount: number;
  authorized_date: string;
  authorized_datetime: string | null;
  category: string[];
  category_id: string;
  check_number: string | null;
  counterparties: string[];
  date: string;
  datetime: string | null;
  iso_currency_code: string;
  location: Location;
  logo_url: string | null;
  merchant_entity_id: string | null;
  merchant_name: string | null;
  name: string;
  payment_channel: string;
  payment_meta: PaymentMeta;
  pending: boolean;
  pending_transaction_id: string | null;
  personal_finance_category: PersonalFinanceCategory;
  personal_finance_category_icon_url: string;
  transaction_code: string | null;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: string | null;
  website: string | null;
}