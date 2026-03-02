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

export type PerfomanceItem = {
    ticker: string
    name: string,
    price: number,
    changePercent: number
}

export type MoverType = 'Gainers' | 'Losers'

export type PortfolioInstrument = {
    id: string
  ticker: string
  name: string
  type: InstrumentType
  quantity: number
  avgBuy: number
  currentPrice: number
}

export type InstrumentType = 'Stock' | 'Crypto' | 'Etf'
