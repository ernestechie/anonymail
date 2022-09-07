import { useParams } from 'react-router-dom';

const Send = () => {
  const params = useParams();
  console.log(params.receiver);

  return (
    <section className='page'>
      <div className='max-w-[360px] m-auto py-8'>
        <form action>
          <h1 className='my-4 font-bold text-2xl'>
            Send message to
            <span className='text-purple-700'> {params.receiver}</span>
          </h1>
          <textarea
            name='message'
            id='message'
            placeholder='Start typing'
            className='bg-transparent w-full resize-none border-2 border-purple-700 rounded-lg p-4 text-lg outline-none'
          ></textarea>
          <button className='bg-purple-700 px-4 py-2 text-white rounded-lg w-full'>
            SEND
          </button>
        </form>
      </div>
    </section>
  );
};

export default Send;
