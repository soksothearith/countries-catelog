import axios from 'axios';
import { useRequest } from 'ahooks';
import { useEffect, useMemo, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import SearchInput from './components/SearchInput';
import { CircularProgress, IconButton, Pagination } from '@mui/material';

const listCountry = async () => {
  const res = await axios.get<ICountry.ICountry[]>(
    'https://restcountries.com/v3.1/all',
    {
      params: {
        fields: 'name,flags,cca2,cca3,altSpellings,idd',
      },
    }
  );
  return res.data;
};

const rowsPerPage = 25;

function App() {
  const { data, loading: loadingListCountry } = useRequest(listCountry);
  console.log('data:', data);

  const [sort, setSort] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  useEffect(() => {
    if (search) {
      setPage(0);
    }
  }, [search]);

  const visibleRows = useMemo(
    () =>
      data
        ?.sort((a, b) =>
          sort === 0
            ? a.name.official.localeCompare(b.name.official)
            : b.name.official.localeCompare(a.name.official)
        )
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, sort, page, rowsPerPage]
  );

  return (
    <div className=''>
      <div className='sticky top-0 py-3 bg-white shadow-sm'>
        <div className='container max-w-4xl mx-auto flex justify-center'>
          <SearchInput onSearchChange={(text) => setSearch(text)} />
        </div>
      </div>
      <div className='container max-w-4xl mx-auto mt-4'>
        <div className='grid grid-cols-11 items-center gap-4 my-4 px-4 py-2 bg-slate-100 rounded-md sticky top-[64px] shadow-sm'>
          <p>Flag</p>
          <div className='col-span-2 flex items-center'>
            <p>Country Name</p>
            <IconButton
              size='small'
              onClick={() => setSort((prev) => (prev === 1 ? 0 : 1))}
            >
              {sort === 0 ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
            </IconButton>
          </div>
          <p>CCA2</p>
          <p>CCA3</p>
          <p className='col-span-2'>Native Name(ENG)</p>
          <div className='col-span-3 ml-1'>Alt Spellings</div>
          <p>IDD</p>
        </div>
        {!visibleRows && loadingListCountry ? (
          <div className='flex items-center justify-center h-[calc(100vh-185px)]'>
            <CircularProgress />
          </div>
        ) : (
          visibleRows
            ?.filter((d) =>
              d.name.official
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
            .map((da) => (
              <div
                key={da.cca3}
                className='grid grid-cols-11 items-center gap-4 my-4 px-4 py-2 bg-slate-100 rounded-md'
              >
                <img
                  className='w-12 h-12 object-contain'
                  src={da.flags.png}
                  alt=''
                />
                <p className='col-span-2'>{da.name.official}</p>
                <p>{da.cca2}</p>
                <p>{da.cca3}</p>
                <p className='col-span-2'>
                  {da?.name?.nativeName?.eng?.official || 'N/A'}
                </p>
                <div className='col-span-3 flex flex-wrap items-baseline space-x-1 space-y-1'>
                  {da?.altSpellings.map((al, i) => (
                    <p
                      key={i}
                      className='bg-white rounded-full ml-1 px-2 py-1 text-nowrap text-ellipsis overflow-hidden max-w-full text-sm'
                    >
                      {al}
                    </p>
                  ))}
                </div>
                <p>{da?.idd?.root}</p>
              </div>
            ))
        )}
        <div className='sticky bottom-0 flex justify-center bg-white shadow-sm py-2'>
          <Pagination
            count={(data?.length || 0) / rowsPerPage}
            color='primary'
            page={page + 1}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
