type Language = {
  name: string;
  translations: Record<string, never>;
};

type Modifier = {
  text: string;
  optional: boolean;
};

type SparkLine = {
  data: (number | null)[];
  totalChange: number;
};

type Pay = {
  id: number;
  league_id: number;
  pay_currency_id: number;
  get_currency_id: number;
  sample_time_utc: Date;
  count: number;
  value: number;
  data_point_count: number;
  includes_secondary: boolean;
  listing_count: number;
};

type Receive = {
  id: number;
  league_id: number;
  pay_currency_id: number;
  get_currency_id: number;
  sample_time_utc: Date;
  count: number;
  value: number;
  data_point_count: number;
  includes_secondary: boolean;
  listing_count: number;
};
export type CurrencyLine = {
  currencyTypeName: string;
  pay: Pay;
  receive: Receive;
  paySparkLine: SparkLine;
  receiveSparkLine: SparkLine;
  lowConfidencePaySparkLine: SparkLine;
  lowConfidenceReceiveSparkLine: SparkLine;
  chaosEquivalent: number;
  detailsId: string;
};

export type CurrencyDetail = {
  id: number;
  icon: string;
  name: string;
  tradeId: string;
};

export type ItemLine = {
  id: number;
  name: string;
  icon: string;
  mapTier: number;
  levelRequired: number;
  stackSize: number;
  links: number;
  itemClass: number;
  sparkline: SparkLine;
  lowConfidenceSparkline: SparkLine;
  implicitModifiers: Modifier[];
  explicitModifiers: Modifier[];
  flavourText: string;
  corrupted: boolean;
  gemLevel: number;
  gemQuality: number;
  itemType: string;
  chaosValue: number;
  exaltedValue: number;
  count: number;
  detailsId: string;
  mapRegion?: string;
  prophecyText?: string;
  artFilename?: string;
  baseType?: string;
};

/**
 * Response from the `/poe-ninja/currency-rates/` endpoint.
 */
export type CurrenciesResponse = {
  lines: CurrencyLine[];
  currencyDetails: CurrencyDetail[];
  language: Language;
};

/**
 * Response from the `/poe-ninja/all-currencies-rates/` endpoint.
 */
export type AllCurrenciesRatesResponse = {
  categories: {
    type: 'Currency' | 'Fragment';
    response: CurrenciesResponse;
  }[];
};

/**
 * Response from the `/poe-ninja/item-rates/` endpoint.
 */
export type ItemsResponse = {
  lines: ItemLine[];
  language: Language;
};

/**
 * Response from the `/poe-ninja/all-items-rates/` endpoint.
 */
export type AllItemsRatesResponse = {
  categories: {
    type:
      | 'DeliriumOrb'
      | 'Watchstone'
      | 'Oil'
      | 'Incubator'
      | 'Scarab'
      | 'Fossil'
      | 'Resonator'
      | 'Essence'
      | 'DivinationCard'
      | 'Prophecy'
      | 'SkillGem'
      | 'UniqueMap'
      | 'Map'
      | 'UniqueJewel'
      | 'UniqueFlask'
      | 'Beast'
      | 'Vial'
      | 'Invitation';
    response: ItemsResponse;
  }[];
};
