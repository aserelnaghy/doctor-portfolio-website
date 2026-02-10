// src/hooks/usePhoneActions.js
import { useMemo, useCallback } from "react";

export function usePhoneActions(site) {
  const phoneDisplay = site?.phoneDisplay || site?.phoneTel || "";

  const phoneTel = useMemo(() => {
    const raw = site?.phoneTel || phoneDisplay || "";
    return raw.replace(/\s+/g, "");
  }, [site?.phoneTel, phoneDisplay]);

  const callNow = useCallback(() => {
    if (!phoneTel) return;
    window.location.href = `tel:${phoneTel}`;
  }, [phoneTel]);

  return { phoneDisplay, phoneTel, callNow };
}
