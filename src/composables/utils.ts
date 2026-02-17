export interface BootstrapBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export function useUtils() {
  const BOOTSTRAP_BREAKPOINTS: BootstrapBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  };

  const clamp = (value: number, min: number, max: number): number => {
    if (isNaN(Number(value)) || value === null || value === undefined) {
      return min;
    }
    return Math.min(Math.max(value, min), max);
  };

  const isIOS = (): boolean => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };

  const isStringAnImageUrl = (str: string): boolean => {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(str);
  };

  const isTouchDevice = (): boolean => {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  };

  const isValidEmail = (str: string): boolean => {
    return Boolean(
      String(str)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    );
  };

  const parseCustomText = (title: string, contrastTitle = false): string => {
    if (!title) return "";
    const titleClass = contrastTitle ? "text-primary-light" : "text-primary";
    return title.replace(/\*(.*?)\*/g, `<span class="${titleClass}">$1</span>`);
  };

  const getAbsoluteLocation = (): string => {
    const { protocol, host, pathname, search, hash } = window.location;
    return `${protocol}//${host}${pathname}${search}${hash}`;
  };

  const getRootLocation = (): string => {
    const { protocol, host } = window.location;
    const basePath = import.meta.env.BASE_URL;
    const path = `${protocol}//${host}${basePath}`;
    return path.endsWith("/") ? path : `${path}/`;
  };

  return {
    BOOTSTRAP_BREAKPOINTS,
    clamp,
    isIOS,
    isStringAnImageUrl,
    isTouchDevice,
    isValidEmail,
    parseCustomText,
    getAbsoluteLocation,
    getRootLocation,
  };
}
