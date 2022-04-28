export interface Asset {
  contract_addresses: string;
  id: string;
  name: string;
  serial_id: number;
  slug: string;
  symbol: string;
  metrics: {
    market_data: {
      price_usd: number;
    };
  };
}
