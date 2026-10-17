"use client";

import { useEffect } from "react";

// on phones the topic row scrolls sideways; bring the chosen topic into view
export default function TopicScroll() {
  useEffect(() => {
    const current = document.querySelector<HTMLElement>(".topics [aria-current]");
    const row = current?.parentElement;
    if (current && row && row.scrollWidth > row.clientWidth) {
      const offset = current.getBoundingClientRect().left - row.getBoundingClientRect().left;
      row.scrollLeft += offset - (row.clientWidth - current.offsetWidth) / 2;
    }
  }, []);
  return null;
}
