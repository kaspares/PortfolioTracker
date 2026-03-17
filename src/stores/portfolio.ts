import { ref } from "vue"
import { defineStore } from "pinia"
import type { Portfolio, PortfolioSummary } from "@/types"

const API_URL = import.meta.env.VITE_API_URL

export const usePortfolioStore = defineStore('portfolio', () => {
    const portfolios = ref<PortfolioSummary[]>([])
    const currentPortfolio = ref<Portfolio | null>(null)
    
    async function fetchPortfoliosSummaries() {
        const response = await fetch(`${API_URL}/api/portfolios`,
        {credentials: "include"})
        if(response.ok) {
            portfolios.value = await response.json();
        }
    }

    async function fetchPortfolioById(id: string) {
        const response = await fetch(`${API_URL}/api/portfolios/${id}`, 
            {credentials: 'include'})
        currentPortfolio.value = await response.json()
    }

    return{portfolios, currentPortfolio, fetchPortfolioById, fetchPortfoliosSummaries}
})