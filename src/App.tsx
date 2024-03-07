import axios from 'axios';
import { useRequest } from 'ahooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import { CircularProgress, IconButton, Pagination } from '@mui/material';
import SearchInput from './components/SearchInput';
import DetailDialog, { IDetailDialogRef } from './components/DetailDialog';

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
  const dialogRef = useRef<IDetailDialogRef>(null);

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

  const filteredRows = useMemo(
    () =>
      data?.filter((d) =>
        d.name.official.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      ),
    [data, search]
  );

  const visibleRows = useMemo(
    () =>
      filteredRows
        ?.sort((a, b) =>
          sort === 0
            ? a.name.official.localeCompare(b.name.official)
            : b.name.official.localeCompare(a.name.official)
        )
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filteredRows, sort, page, rowsPerPage]
  );

  const handleRowClick = (da: ICountry.ICountry) => {
    console.log('handleRowClick:', da);
    dialogRef.current?.open(da);
  };

  return (
    <div className=''>
      <DetailDialog ref={dialogRef} />
      <div className='sticky top-0 py-3 bg-white shadow-sm'>
        <div className='container flex justify-center max-w-4xl mx-auto'>
          <SearchInput onSearchChange={(text) => setSearch(text)} />
        </div>
      </div>
      <div className='container max-w-4xl mx-auto mt-4'>
        <div className='grid grid-cols-11 items-center gap-4 my-4 px-4 py-2 bg-slate-100 rounded-md sticky top-[64px] shadow-sm'>
          <p>Flag</p>
          <div className='flex items-center col-span-2'>
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
          visibleRows?.map((da) => (
            <div
              key={da.cca3}
              className='grid items-center grid-cols-11 gap-4 px-4 py-2 my-4 rounded-md bg-slate-100'
            >
              <img
                className='object-contain w-12 h-12'
                src={da.flags.png}
                alt=''
              />
              <p
                className='col-span-2 underline hover:cursor-pointer hover:text-blue-500'
                onClick={() => handleRowClick(da)}
              >
                {da.name.official}
              </p>
              <p>{da.cca2}</p>
              <p>{da.cca3}</p>
              <p className='col-span-2'>
                {da?.name?.nativeName?.eng?.official || 'N/A'}
              </p>
              <div className='flex flex-wrap items-baseline col-span-3 space-x-1 space-y-1'>
                {da?.altSpellings.map((al, i) => (
                  <p
                    key={i}
                    className='max-w-full px-2 py-1 ml-1 overflow-hidden text-sm bg-white rounded-full text-nowrap text-ellipsis'
                  >
                    {al}
                  </p>
                ))}
              </div>
              <p>{da?.idd?.root}</p>
            </div>
          ))
        )}
        <div className='sticky bottom-0 flex justify-center py-2 bg-white shadow-sm'>
          <Pagination
            count={Math.ceil((filteredRows?.length || 0) / rowsPerPage)}
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
