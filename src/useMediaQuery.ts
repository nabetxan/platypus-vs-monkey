import { useEffect, useState } from "react";

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setIsMatch(list.matches);
    const handler = (e: MediaQueryListEvent) => setIsMatch(e.matches);
    list.addEventListener("change", handler);
    return () => list.removeEventListener("change", handler);
  }, [mediaQuery]);
  return isMatch;
}
