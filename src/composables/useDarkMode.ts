import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  // Initialize dark mode from localStorage or system preference
  const initDarkMode = () => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyDarkMode()
  }

  // Apply dark mode to document
  const applyDarkMode = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    localStorage.setItem('darkMode', isDark.value.toString())
    applyDarkMode()
  }

  // Watch for system preference changes
  const watchSystemPreference = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      // Only update if user hasn't manually set a preference
      if (localStorage.getItem('darkMode') === null) {
        isDark.value = e.matches
        applyDarkMode()
      }
    })
  }

  // Watch for changes and apply them
  watch(isDark, () => {
    applyDarkMode()
  })

  onMounted(() => {
    initDarkMode()
    watchSystemPreference()
  })

  return {
    isDark,
    toggleDarkMode
  }
}
