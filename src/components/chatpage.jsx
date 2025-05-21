import {useState} from 'react';
import Header from './header.jsx';
import ChatList from './chat-list.jsx';
import MessagePart from './message-part.jsx';
export default function ChatPage()
{
    const[currentChat, setCurrentChat]=useState(null);
    const[conversations,setConversations]=useState([]);
    return(
       <div>
<Header/>
<div className='flex'>
<ChatList setCurrentChat={setCurrentChat} setConversations={setConversations}/>
<MessagePart currentChat={currentChat} conversations={conversations} setConversations={setConversations}/>
</div>
       </div>
    )
}