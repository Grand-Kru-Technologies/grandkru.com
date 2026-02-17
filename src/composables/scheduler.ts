export function useScheduler() {
  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const debounce = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), wait);
    };
  };

  const throttle = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const waitForCondition = async (
    condition: () => boolean,
    timeout = 5000,
    interval = 100
  ): Promise<boolean> => {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (condition()) return true;
      await delay(interval);
    }

    return false;
  };

  return {
    delay,
    debounce,
    throttle,
    waitForCondition,
  };
}
