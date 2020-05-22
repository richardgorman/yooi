import { useCallback, useState } from 'react';

function findItem(items, id) {
  return items.find(item => item.id === id);
}

function useOne({ items, initialValue, onChange }) {
  // Determine the current state from the given default value.
  // The `current` state always contains the found item as a whole.
  const initialState = findItem(items, initialValue);
  const [current, setCurrent] = useState(initialState || null);

  const handleChange = useCallback((id = null) => {
    // When no id is given, treat this as unsetting the value.
    if (!id) {
      setCurrent(null)
    }

    // If the value given is already the current value
    // then ignore the change.
    if (current && current.id === id) {
      return;
    }

    const next = findItem(items, id);

    if (!next) {
      return;
    }

    if (typeof onChange === 'function') {
      onChange(next, current);
    }

    setCurrent(next);
  }, []);

  return [ current, handleChange ];
}

export default useOne;