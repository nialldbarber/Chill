import {useRef, useEffect} from 'react';

export default function useTimeout(callback: () => void, delay: number) {
  const timeoutRef = useRef<any>(null);
  const savedCallback = useRef<any>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
}
