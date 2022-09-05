import busyIndicator from './BusyIndicator.svg';

const BusyIndicator = () => {
  return (
    <div className='m-auto absolute z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
      <img src={busyIndicator} alt='LoadingSpinner' className='block m-auto' />
    </div>
  );
};

export default BusyIndicator;
