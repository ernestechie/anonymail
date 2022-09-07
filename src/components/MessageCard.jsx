import { Link } from 'react-router-dom';

const MessageCard = (props) => {
  const timeStamp = new Date(props.timeStamp.seconds * 1000);

  const year = timeStamp.getUTCFullYear();
  const month = timeStamp.getUTCMonth() + 1;
  const day = timeStamp.getDate();
  const hour = timeStamp.getHours();
  const minute = timeStamp.getMinutes();

  return (
    <div className='border-2 border-purple-700 p-2 my-2 rounded-xl w-full'>
      <h2 className='font-black text-purple-700 text-lg'>Message: </h2>
      <h2>{props.text}</h2>
      <h2 className='font-black text-purple-700 my-2 text-sm'>
        TIME: [{day}-{month}-{year} {hour}-{minute}]
      </h2>
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
