import { useState } from "react";



export function useModalState<T>(initialValue: T | null = null) {
  const [item, setItem] = useState<T | null>(initialValue);

  const isOpen = item !== null;

  function open(value: T) {
    setItem(value);
  }

  function close() {
    setItem(null);
  }

  function set(value: T | null) {
    setItem(value);
  }

  return {
    item,
    isOpen,
    open,
    close,
    set,
  };
}
