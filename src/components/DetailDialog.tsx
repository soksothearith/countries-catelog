import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

export interface IDetailDialogRef {
  open: (country?: ICountry.ICountry) => void;
  close: () => void;
}
function DetailDialog({}, ref: ForwardedRef<IDetailDialogRef | undefined>) {
  const [open, setOpen] = useState(false);
  const countryData = useRef<ICountry.ICountry | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) {
        countryData.current = data;
        setOpen(true);
      }
    },
    close: () => setOpen(false),
  }));

  const countryInfo = countryData.current;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{ sx: { borderRadius: 2 } }}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>Country Info</DialogTitle>
      <DialogContent>
        <div className='space-y-1'>
          <div className='flex items-center'>
            <p className='min-w-44'>Flag</p>:
            <img
              className='w-8 h-8 object-contain ml-1'
              src={countryInfo?.flags.png}
              alt=''
            />
          </div>
          <div className='flex'>
            <p className='min-w-44'>Official Name</p>
            <p>: {countryInfo?.name?.official}</p>
          </div>
          <div className='flex'>
            <p className='min-w-44'>Common Name</p>
            <p>: {countryInfo?.name?.common}</p>
          </div>
          <div className='flex'>
            <p className='min-w-44'>CCA2</p>
            <p>: {countryInfo?.cca2}</p>
          </div>
          <div className='flex'>
            <p className='min-w-44'>CCA3</p>
            <p>: {countryInfo?.cca3}</p>
          </div>
          <div className='flex'>
            <p className='min-w-44'>Native Name(ENG)</p>
            <p>: {countryInfo?.name?.nativeName?.eng?.official || 'N/A'}</p>
          </div>
          <div className='flex items-baseline'>
            <p className='min-w-44'>Alt Spellings</p>:
            <div className='flex flex-wrap items-baseline space-x-1 space-y-1'>
              {countryInfo?.altSpellings.map((al, i) => (
                <p
                  key={i}
                  className='bg-slate-100 rounded-full ml-1 px-2 py-1 text-nowrap text-ellipsis overflow-hidden max-w-full text-xs'
                >
                  {al}
                </p>
              ))}
            </div>
          </div>
          <div className='flex'>
            <p className='min-w-44'>IDD</p>
            <p>
              :{' '}
              {`${countryInfo?.idd?.root} (${countryInfo?.idd.suffixes.reduce(
                (acc, item, index) =>
                  acc +
                  item +
                  (index !== countryInfo.idd.suffixes.length - 1 ? ', ' : ''),
                ''
              )})`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default forwardRef(DetailDialog);
