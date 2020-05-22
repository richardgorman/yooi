import { useCallback, useState } from 'react';

function useToggle(defaultValue = false) {
  const [toggled, setToggled] = useState(defaultValue);

  const handleToggle = useCallback((next) => {
    setToggled(next);
  }, []);

  return [toggled, handleToggle];
}

export default useToggle;