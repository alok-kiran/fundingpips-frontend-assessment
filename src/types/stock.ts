export interface Stock {
  id: string;
  company_symbol: string;
  price: string;
  change_amount: string;
  company: string;
  volume: string;
  change_percentage: string;
  isfavourite: boolean;
  category: string;
}

export interface StockState {
  stocks: Stock[];
  favorites: string[];
  sortBy: keyof Stock;
  sortDirection: 'asc' | 'desc';
  filterText: string;
}