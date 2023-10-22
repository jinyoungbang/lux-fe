export interface TransactionData {
  account_id:                         string;
  account_owner:                      null;
  amount:                             number;
  authorized_date:                    null;
  authorized_datetime:                null;
  category:                           string[];
  category_id:                        string;
  check_number:                       null;
  counterparties:                     Counterparty[];
  date:                               string;
  datetime:                           null;
  iso_currency_code:                  string;
  location:                           Location;
  logo_url:                           string;
  merchant_entity_id:                 string;
  merchant_name:                      string;
  name:                               string;
  payment_channel:                    string;
  payment_meta:                       PaymentMeta;
  pending:                            boolean;
  pending_transaction_id:             null;
  personal_finance_category:          PersonalFinanceCategory;
  personal_finance_category_icon_url: string;
  transaction_code:                   null;
  transaction_id:                     string;
  transaction_type:                   string;
  unofficial_currency_code:           null;
  website:                            string;
  modified_amount?:                   number;
  is_hidden:                         boolean;
}

export interface Counterparty {
  confidence_level: string;
  entity_id:        string;
  logo_url:         string;
  name:             string;
  type:             string;
  website:          string;
}

export interface Location {
  address:      null;
  city:         null;
  country:      null;
  lat:          null;
  lon:          null;
  postal_code:  null;
  region:       null;
  store_number: null;
}

export interface PaymentMeta {
  by_order_of:       null;
  payee:             null;
  payer:             null;
  payment_method:    null;
  payment_processor: null;
  ppd_id:            null;
  reason:            null;
  reference_number:  null;
}

export interface PersonalFinanceCategory {
  confidence_level: string;
  detailed:         string;
  primary:          string;
}
