import {useEffect, useRef} from 'react';

export default function useInterval(
  callback: () => void,
  interval: number = 1000,
  ...deps: any
) {
  const callbackRef = useRef<any>(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const tick = () => callbackRef?.current();

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval, ...deps]);
}
