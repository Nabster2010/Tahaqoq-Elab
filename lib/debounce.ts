import { useRef, useCallback } from 'react';

export function debounce<F extends (...args: any[]) => any>(func: F, delay: number): F {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: Parameters<F>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => func(...args), delay);
  }, [func, delay]) as F;
}