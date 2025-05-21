import {useState} from 'react';
import {FaPaperPlane} from 'react-icons/fa';
export default function MessagePart({currentChat,conversations,setConversations})
{
    const[isSend, setIsSend]=useState(true);
    const[currentMessage, setCurrentMessage]=useState('');
    const toggleSendReceive=()=>{
    setIsSend(!isSend);
    }
    const sendMessage=()=>{
        if(currentMessage==='')
        {
            return;
        }
      setConversations(prev=>([...prev,{text:currentMessage,isSender:isSend}]));
      setCurrentMessage('');
    }
    return(
        <div className='convo p-4 h-screen'>
            {
            currentChat&&
            <div>
           <header className='p-2 flex space-x-7 border-b'>
            <img src={currentChat.profilePic} alt={currentChat.name} className='rounded-full h-12 w-12'/>
            <div>
            <h1 className='font-semibold'>{currentChat.name}</h1>
            <p>{currentChat.status}</p>
            </div>
            </header>
            <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                <p className='bg-pink-300 rounded-lg p-2 max-w-md'>
                    Hey gorgeous... 💌 everything you say here stays between just you and your person. This chat is fully end-to-end encrypted — wrapped tight in digital silk. No third eyes, no peeking, not even Pinky-Talks knows what you're whispering.
Your words are private, protected, and sealed with a kiss of code 💖🔐 So go on... say whatever’s on your heart. It’s just the two of you in here. Always.
                </p>
                <ul className='space-y-3'>
                {conversations.map((c,index)=>(
                    <li key={index} className={`${c.isSender?'bg-pink-500 ml-auto':'bg-pink-100 mr-auto'} p-2 shadow-md rounded-lg max-w-xs`}>
                        {c.text}
                    </li>
                ))}
                </ul>
                <div className='flex items-center gap-2 p-4 border-t'>
                    <button onClick={toggleSendReceive} className={`${isSend?'bg-pink-500':'bg-pink-100'} px-4 py-1 rounded-full`}>
                        {isSend?'Receive':'Send'}
                        </button>
                    <input type='text'
                    value={currentMessage}
                    onChange={(e)=>setCurrentMessage(e.target.value)}
                    placeholder='Write your message'
                    className='flex-1 p-2 rounded-full border focus:outline-none'
                    />
                <FaPaperPlane size={20} onClick={sendMessage} className='cursor-pointe text-pink-600 hover:text-pink-800'/>
                </div>
            </div>
        </div>
            }
        </div>
        
    )
}