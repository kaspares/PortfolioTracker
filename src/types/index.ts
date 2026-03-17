export interface Signals {
    id: string
    stock: Stock
    result: SignalAction            
    describe: string
}

export type Stock = {
    ticker: string
}

export type SignalAction = 'BUY' | 'SELL'

export type MoverType = 'Gainers' | 'Losers'

export type InstrumentType = 'Stock' | 'Crypto' | 'Etf'

export interface PortfolioSummary {
    id: string
    name: string
    description: string
    itemCount: number
    CreatedAt: string
}

export interface Portfolio {
    id: string
    name: string
    description: string
    createdAt: number
    items: PortfolioItem[]
    totalValue: number
    totalProfitLoss: number
    totalProfitLossPercent: number
}

export interface PortfolioItem {
    id: string
  ticker: string
  quantity: number
  purchasePrice: number
  purchaseDate: string
  comments: ItemComment[]
  currentPrice: number | null
  marketValue: number | null
  profitLoss: number | null
  profitLossPercent: number | null
}

export interface ItemComment {
  id: string
  content: string
}