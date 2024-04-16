import React from "react";

export function useLockBodyScroll(enabled: boolean) {
  // this hook was extended from the original at https://usehooks.com/uselockbodyscroll
  React.useLayoutEffect(() => {
    if (!enabled) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [enabled]);
}
