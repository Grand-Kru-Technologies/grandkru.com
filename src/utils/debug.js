const isStaging = window.location.hostname === 'staging.grandkru.com'

export const debug = {
  log: (...args) => {
    if (isStaging) {
      console.log('[DEBUG]', ...args)
    }
  },
  error: (...args) => {
    if (isStaging) {
      console.error('[ERROR]', ...args)
    }
  },
  warn: (...args) => {
    if (isStaging) {
      console.warn('[WARN]', ...args)
    }
  },
  info: (...args) => {
    if (isStaging) {
      console.info('[INFO]', ...args)
    }
  }
}

// Log environment information
debug.log('Environment:', {
  hostname: window.location.hostname,
  pathname: window.location.pathname,
  href: window.location.href,
  userAgent: navigator.userAgent,
  isStaging
})