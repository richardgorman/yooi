import useToggle from './useToggle';

function useDialog(defaultValue = false) {
  const [toggled, setToggled] = useToggle(defaultValue);

  function close() {
    setToggled(false);
  }

  function open() {
    setToggled(true);
  }

  return [{
    close,
    isOpen: toggled,
    open,
  }];
}

export default useDialog;