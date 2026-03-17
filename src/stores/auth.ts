import { ref } from 'vue'
import { defineStore } from "pinia";

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    const userEmail = ref<string | null>(null)

    async function checkAuth() {
        const res = await fetch(`${API_URL}/manage/info`, 
            {credentials: 'include'})
            if(res.ok) {
                const data = await res.json()
                userEmail.value = data.email
                isAuthenticated.value = true
            } else {
                isAuthenticated.value = false
                userEmail.value = null
            }
        }
    async function login(email: string, password: string) {
        const response = await fetch(`${API_URL}/login?useCookies=true`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        })
        if(response.ok) {
            await checkAuth()
        }
    }

    return {isAuthenticated, login, userEmail}
})