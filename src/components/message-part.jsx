import {useState} from 'react';
import {FaPaperPlane} from 'react-icons/fa';

export default function MessagePart({currentChat,conversations,setConversations}) {
    const[isSend, setIsSend]=useState(true);
    const[currentMessage, setCurrentMessage]=useState('');
    
    const toggleSendReceive=()=>{
        setIsSend(!isSend);
    }
    
    const sendMessage=()=>{
        if(currentMessage==='') {
            return;
        }
        setConversations(prev=>([...prev,{text:currentMessage,isSender:isSend}]));
        setCurrentMessage('');
    }
    
    return(
        <div className='convo p-2 md:p-4 h-screen flex flex-col'>
            {currentChat &&
                <div className='flex flex-col h-full'>
                    <header className='p-2 flex space-x-4 md:space-x-7 border-b items-center'>
                        <img 
                            src={currentChat.profilePic} 
                            alt={currentChat.name} 
                            className='rounded-full h-10 w-10 md:h-12 md:w-12'
                        />
                        <div>
                            <h1 className='font-semibold text-lg md:text-xl'>{currentChat.name}</h1>
                            <p className='text-sm md:text-base'>{currentChat.status}</p>
                        </div>
                    </header>
                    
                    <div className='flex-1 overflow-y-auto p-2 md:p-4 space-y-2'>
                        <p className='bg-pink-300 rounded-lg p-2 max-w-full md:max-w-md text-sm md:text-base'>
                            Hey gorgeous... 💌 everything you say here stays between just you and your person. This chat is fully end-to-end encrypted — wrapped tight in digital silk. No third eyes, no peeking, not even Pinky-Talks knows what you're whispering.
                            Your words are private, protected, and sealed with a kiss of code 💖🔐 So go on... say whatever's on your heart. It's just the two of you in here. Always.
                        </p>
                        
                        <ul className='space-y-2 md:space-y-3'>
                            {conversations.map((c,index)=>(
                                <li 
                                    key={index} 
                                    className={`${c.isSender?'bg-pink-500 ml-auto':'bg-pink-100 mr-auto'} p-2 shadow-md rounded-lg max-w-xs md:max-w-md text-sm md:text-base`}
                                >
                                    {c.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className='flex items-center gap-2 p-2 md:p-4 border-t'>
                        <button 
                            onClick={toggleSendReceive} 
                            className={`${isSend?'bg-pink-500 text-white':'bg-pink-100'} px-3 py-1 md:px-4 rounded-full text-sm md:text-base`}
                        >
                            {isSend?'Receive':'Send'}
                        </button>
                        <input 
                            type='text'
                            value={currentMessage}
                            onChange={(e)=>setCurrentMessage(e.target.value)}
                            placeholder='Write your message'
                            className='flex-1 p-2 rounded-full border focus:outline-none text-sm md:text-base'
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <FaPaperPlane 
                            size={20} 
                            onClick={sendMessage} 
                            className='cursor-pointer text-pink-600 hover:text-pink-800 transition-colors'
                        />
                    </div>
                </div>
            }
        </div>
    )
}