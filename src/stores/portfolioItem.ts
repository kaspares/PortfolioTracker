import { ref } from "vue";
import { defineStore } from "pinia";
import type { PortfolioItem } from "@/types";

const API_URL = import.meta.env.VITE_API_URL

export const usePortfolioItemStore = defineStore('portfolioItem', () => {
    const portfolioItems = ref<PortfolioItem[]>([])
    const currentItem = ref<PortfolioItem | null>(null)

    async function fetchAllItemsInPortfolio(portfolioId: string) {
        const response = await fetch(`${API_URL}/api/${portfolioId}/portfolioItems`,
            {credentials: 'include'})
        if(response.ok) {
            portfolioItems.value = await response.json()
        }
    }

    async function fetchPortfolioItemById(portfolioId: string, portfolioItemId: string) {
        const response = await fetch(`${API_URL}/api/${portfolioId}/portfolioItems/${portfolioItemId}`,
            {credentials: 'include'})
        if(response.ok) {
            currentItem.value = await response.json()
        }
    }
    
    return {portfolioItems, currentItem, fetchAllItemsInPortfolio, fetchPortfolioItemById}
})