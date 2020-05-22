import { useEffect, useRef } from 'react';

function useUpdateEffect(fn, deps) {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      fn();
    } else {
      ref.current = true;
    }
  }, deps);
}

export default useUpdateEffect;
