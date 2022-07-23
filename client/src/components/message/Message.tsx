import Error from '../icon/Error';
import Success from '../icon/Success';
import './Message.css';

interface MessageProps {
    status: string;
    content: string;
}

function Message({status, content}: MessageProps) {
    return (
        <p className={'message ' + (status === 'succeeded'? 'green': 'red')}> 
            <span className='message-icon'> 
                {status === 'succeeded' && <Success/>}
                {status === 'failed' && <Error/>}
            </span>

            {content}

            {status === 'succeeded' &&  <span style={{marginLeft: '0.5rem'}}> &#127881; </span>}
        </p>
    )
};

export default Message;