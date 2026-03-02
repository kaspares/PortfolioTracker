<script setup lang="ts">
import PortfolioTable from '@/components/portfolio/PortfolioTable.vue';
import type { PortfolioInstrument } from '@/types';
const portfolio: PortfolioInstrument[] = [
  {
    "id": "1",
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "type": "Stock",
    "quantity": 15,
    "avgBuy": 175.5,
    "currentPrice": 169.549
  },
  {
    "id": "2",
    "ticker": "GOOGL",
    "name": "Alphabet Inc.",
    "type": "Stock",
    "quantity": 8,
    "avgBuy": 138.2,
    "currentPrice": 137.378
  },
  {
    "id": "3",
    "ticker": "MSFT",
    "name": "Microsoft Corp.",
    "type": "Stock",
    "quantity": 12,
    "avgBuy": 378.0,
    "currentPrice": 402.992
  },
  {
    "id": "4",
    "ticker": "AMZN",
    "name": "Amazon.com Inc.",
    "type": "Stock",
    "quantity": 10,
    "avgBuy": 178.5,
    "currentPrice": 185.966
  },
  {
    "id": "5",
    "ticker": "BTC",
    "name": "Bitcoin",
    "type": "Crypto",
    "quantity": 0.5,
    "avgBuy": 42000,
    "currentPrice": 70410.365
  },
  {
    "id": "6",
    "ticker": "ETH",
    "name": "Ethereum",
    "type": "Crypto",
    "quantity": 3,
    "avgBuy": 2200,
    "currentPrice": 3222.757
  },
  {
    "id": "7",
    "ticker": "SPY",
    "name": "S&P 500 ETF",
    "type": "Etf",
    "quantity": 20,
    "avgBuy": 445,
    "currentPrice": 494.511
  },
  {
    "id": "8",
    "ticker": "QQQ",
    "name": "Nasdaq 100 ETF",
    "type": "Etf",
    "quantity": 15,
    "avgBuy": 385,
    "currentPrice": 456.725
  }
]
</script>

<template>
<div>
    <PortfolioTable
    :items="portfolio"
    />
</div>
</template>