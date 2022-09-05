import { Link } from 'react-router-dom';

const MessageCard = (props) => {
  return (
    <div>
      <h2>Message: </h2>
      <h2>{props.text}</h2>
      <h2>{props.timeStamp}</h2>
      <Link to={`/user/inbox/:${props.path}`} />
    </div>
  );
};

export default MessageCard;
