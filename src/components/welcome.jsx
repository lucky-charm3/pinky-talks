import {ChatContext} from './context.jsx';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
export default function Welcome()
{
    const{signedFormData}=useContext(ChatContext);
    let name=signedFormData.name;
    const navigate=useNavigate();
    function Chat()
    {
        navigate('/chat-page');
    }
      return(
        <div className='flex items-center'>
            <div className='flex flex-col space-y-6 justify-center h-screen ml-9 text-2xl font-semibold'>
<h1 className='hi text-5xl'>Hello {name.split(' ')[0]}, Welcome to pinky chat!</h1>
<p className='welcome-message w-1/2'> We’re so excited to have you here on Pinky Talks — your favorite place to vibe, chat, and express your thoughts freely. 
    Every login from you adds more sparkle to our space. 
    Don’t hold back — your voice matters and we can’t wait to hear what’s on your mind.
     Whether you're here to catch up with old friends or make new ones, just know you're in the right place.
      Explore, connect, and make every message count. So sit back, relax, and enjoy your stay — this is your zone now.
</p>
<button onClick={Chat} className='chat-button p-2 bg-pink-500 rounded-lg w-10 hover:bg-pink-600'>Chat Now!</button>
        </div>
        <div className='girl'>
            <img src='./pinky-talks.jpg' alt='pinky-talks' className='rounded-lg'/>
        </div>
        </div>
    )
}