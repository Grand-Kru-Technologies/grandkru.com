import { Router } from 'vue-router'

// Handle SPA fallback redirects from 404.html
export function handleRedirect(router: Router): void {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectPath = urlParams.get('redirect');

  if (redirectPath) {
    // Remove the redirect parameter from URL
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('redirect');
    window.history.replaceState({}, '', newUrl.toString());

    // Navigate to the intended route
    router.push(redirectPath);
  }
}