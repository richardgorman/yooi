import { useRef, useState } from 'react';
import useListener from './useListener';
import useToggle from './useToggle';
import useUpdateEffect from './useUpdateEffect';

function useButton(props) {
  const [busy, setBusy] = useToggle(props.busy || false);
  const [disabled, setDisabled] = useToggle(props.disabled || false);
  
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(0);

  // Determine a `ref` for the button. Create one
  // for internal use if none was given.
  const innerRef = useRef();
  const ref = props.ref || innerRef;

  function handleDisableChange(nextDisabled) {
    setDisabled(nextDisabled);

    // When the button is disabled it cannot
    // be simultaneously be the focussed element.
    if (nextDisabled) {
      setFocused(false);
    }
  }

  function handleClick(event) {
    setTouched(current => current + 1);

    if (typeof props.onClick === 'function') {
      props.onClick(event, {
        busy,
        ref,
        setBusy,
        setDisabled: handleDisableChange,
        touched,
      });
    }
  }

  function handleFocus(event) {
    setFocused(true);

    if (typeof props.focus === 'function') {
      props.onFocus(event, { busy, ref, touched });
    }
  }

  function handleBlur(event) {
    setFocused(false);

    if (typeof props.blur === 'function') {
      props.onBlur(event, { busy, ref, touched });
    }
  }

  useListener({ ref, event: 'click', handler: handleClick });
  useListener({ ref, event: 'focus', handler: handleFocus });
  useListener({ ref, event: 'blur', handler: handleBlur });

  useUpdateEffect(() => {
    if (busy !== props.busy) {
      setBusy(props.busy);
    }
  }, [props.busy]);

  useUpdateEffect(() => {
    if (disabled !== props.disabled) {
      setBusy(props.disabled);
    }
  }, [props.disabled]);

  return [{ busy, disabled, focused, ref, touched }];
};

export default useButton;
