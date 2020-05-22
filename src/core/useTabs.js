import useOne from './useOne';

function useTabs({ initialValue, items, onChange }) {
  return useOne({
    initialValue: initialValue || items[0]?.id,
    items,
    onChange,
  });
}

export default useTabs;
