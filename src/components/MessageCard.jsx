import { useState } from 'react';
import { RiTimeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const MessageCard = (props) => {
  const timeStamp = new Date(props.timeStamp.seconds * 1000);
  const [showTime, setShowTime] = useState(false);

  const toggleShowTime = () => setShowTime((prev) => !prev);

  const year = timeStamp.getUTCFullYear();
  const month = timeStamp.getUTCMonth() + 1;
  const day = timeStamp.getDate();
  const hour = timeStamp.getHours();
  const minute = timeStamp.getMinutes();

  const period = hour < 12 ? 'AM' : 'PM';

  return (
    <div className='border-2 border-purple-700 p-2 mt-8 mb-10 w-full relative rounded-tr-3xl rounded-br-3xl rounded-bl-3xl'>
      <span
        className='absolute -top-6 -left-2 bg-purple-700 p-2 text-white font-black flex items-center justify-between gap-2 transition-all duration-500 ease-in rounded-full cursor-pointer'
        onClick={toggleShowTime}
      >
        <RiTimeFill className='text-xl' />
        {showTime && (
          <span className='text-sm  transition-all duration-500 ease-in'>
            <span className='mr-2'>
              {day}-{month}-{year}
            </span>
            <span>
              {hour > 9 && hour < 12 && <span>{hour}:</span>}
              {hour > 12 && <span>0{hour - 12}:</span>}
              {hour < 10 && <span>0{hour}:</span>}
              {minute < 10 ? `0${minute}` : `${minute}`} {period}
            </span>
          </span>
        )}
      </span>
      <h2 className='my-3 p-1'>{props.text}</h2>
      <Link
        to={`/user/inbox/${props.path}`}
        target='_blank'
        className='text-center py-1 w-full rounded-xl bg-gray-900 block text-white text-sm'
      >
        View and save
      </Link>
    </div>
  );
};

export default MessageCard;
