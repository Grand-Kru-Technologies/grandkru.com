declare global {
  interface Window {
    __scrollEnabled?: boolean;
    __savedBodyStyle?: {
      position: string;
      top: string;
      left: string;
      right: string;
      width: string;
      overflow: string;
    };
  }
}

export function useLayout() {
  const setBodyScrollEnabled = (enabled: boolean): void => {
    if (window.__scrollEnabled === undefined) window.__scrollEnabled = true;
    if (enabled) _enableScroll();
    else _disableScroll();
  };

  const _enableScroll = (): void => {
    if (window.__scrollEnabled) return;

    const bodyStyle = document.body.style;
    if (window.__savedBodyStyle) {
      bodyStyle.position = window.__savedBodyStyle.position;
      bodyStyle.top = window.__savedBodyStyle.top;
      bodyStyle.left = window.__savedBodyStyle.left;
      bodyStyle.right = window.__savedBodyStyle.right;
      bodyStyle.width = window.__savedBodyStyle.width;
      bodyStyle.overflow = window.__savedBodyStyle.overflow;
      delete window.__savedBodyStyle;
    }
    window.__scrollEnabled = true;
  };

  const _disableScroll = (): void => {
    if (!window.__scrollEnabled) return;

    const bodyStyle = document.body.style;
    window.__savedBodyStyle = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      left: bodyStyle.left,
      right: bodyStyle.right,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
    };

    bodyStyle.position = "fixed";
    bodyStyle.top = "0px";
    bodyStyle.left = "0";
    bodyStyle.right = "0";
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    window.__scrollEnabled = false;
  };

  const isBodyScrollEnabled = (): boolean => {
    if (window.__scrollEnabled === undefined) window.__scrollEnabled = true;
    return window.__scrollEnabled;
  };

  const isElementOutsideBounds = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom < 0 ||
      rect.right < 0 ||
      rect.left > window.innerWidth ||
      rect.top > window.innerHeight
    );
  };

  const scrollIntoView = (element: HTMLElement): void => {
    const elNavbar = document.querySelector(".gkt-navbar-compressed");
    const navOffset = elNavbar
      ? elNavbar.getBoundingClientRect().height - 2
      : 70;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return {
    setBodyScrollEnabled,
    isBodyScrollEnabled,
    isElementOutsideBounds,
    scrollIntoView,
  };
}
