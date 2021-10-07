import {useEffect} from 'react';

export default function useTimeout(
  callback: () => void | number,
  timeout: number = 1000,
  ...deps: any
) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, timeout);
    return () => clearTimeout(timer);
  }, [...deps]);
}
