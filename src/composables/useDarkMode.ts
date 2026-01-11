import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(true) // Default to dark mode

  // Initialize dark mode from localStorage, defaulting to dark mode
  const initDarkMode = () => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      // Default to dark mode
      isDark.value = true
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

  // Initialize immediately (before mount) to prevent flash of light mode
  const saved = localStorage.getItem('darkMode')
  // Default to dark mode - only use light mode if explicitly set to 'false'
  if (saved === 'false') {
    isDark.value = false
  } else {
    // Default to dark mode (null, 'true', or any other value)
    isDark.value = true
  }
  applyDarkMode()

  onMounted(() => {
    initDarkMode()
    watchSystemPreference()
  })

  return {
    isDark,
    toggleDarkMode
  }
}
