import { useCallback, useEffect, useRef, useState } from 'react';

export type Notify = (message: string) => void;

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number>();

  const notify = useCallback<Notify>((msg) => {
    setMessage(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 1800);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { message, notify };
}
