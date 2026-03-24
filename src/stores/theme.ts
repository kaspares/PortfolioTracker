import { ref } from 'vue'
import { defineStore } from 'pinia'

export type ThemeName = 'midnight' | 'daylight'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeName>(
    (localStorage.getItem('theme') as ThemeName) ?? 'midnight'
  )

  function toggle() {
    theme.value = theme.value === 'midnight' ? 'daylight' : 'midnight'
    localStorage.setItem('theme', theme.value)
  }

  const isDark = () => theme.value === 'midnight'

  return { theme, toggle, isDark }
})
