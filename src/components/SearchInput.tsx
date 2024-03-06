import { useDebounceEffect } from 'ahooks';
import { memo, useState } from 'react';

function SearchInput({
  onSearchChange,
}: {
  onSearchChange: (text: string) => void;
}) {
  const [search, setSearch] = useState('');

  useDebounceEffect(
    () => {
      onSearchChange(search);
    },
    [search],
    {
      wait: 500,
    }
  );

  return (
    <input
      className='bg-slate-100 text-black rounded-md p-2 w-2/4'
      placeholder='Search'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default memo(SearchInput);
