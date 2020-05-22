import { useEffect, useRef } from 'react';

function useListener(props) {
  const { event, handler, ref: outerRef } = props;
  const innerRef = useRef();
  const ref = outerRef || innerRef;

  useEffect(() => {
    ref.current.addEventListener(event, handler);

    return () => {
      ref.current.removeEventListener(event, handler);
    };
  }, [handler]);

  return [ref];
}

export default useListener;