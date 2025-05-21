import {useContext,useState} from 'react';
import {ChatContext} from './context.jsx';
import {v4 as uuidv4} from 'uuid';
export default function ChatList({setCurrentChat,setConversations})
{
    const{inChatUsers,setInChatUsers}=useContext(ChatContext);
    const[searchQuery,setSearchQuery]=useState('');
    const[openModal,setOpenModal]=useState(false);
    const[newChat, setNewChat]=useState({name:'',phoneNumber:''});
    const matchedChats=inChatUsers.filter(user=>{
        let match=searchQuery===''||user.name.toLowerCase().includes(searchQuery.trim().toLowerCase())||
                  user.phoneNumber.includes(searchQuery.trim());
                  return match;
    })
    function handleInput(e)
    {
        const{name,value}=e.target;
        setNewChat(prev=>({...prev,[name]:value}))
    }
    function addChat()
    {
        const newUser={
            id:uuidv4(),
            name:newChat.name,
            email:`${newChat.name}${Math.random()*100}@pinky-talks.com`,
            password:`${newChat.name}##${Math.random()*1567}`,
            phoneNumber:newChat.phoneNumber,
            profilePic:'./profile-picha.webp',
            status:Math.random()>0.5?'online':'offline'
        }
        setInChatUsers(prev=>([...prev,newUser]));
        alert('Succesfully added');
        setOpenModal(false);
        setNewChat({name:'',phoneNumber:''});
    }
    function cancel()
    {
        setOpenModal(false);
        setNewChat({name:'',phoneNumber:''});
    }
    function onChatClick(c)
    {
        setCurrentChat(c);
        setConversations([]);
    }
    return(
        <div className='chat-list shadow-lg p-6 w-1/4 shrink-0'>
            <div className='flex space-x-6 items-center p-3 mb-4'>
                <h1 className='text-3xl font-semibold'>Chats</h1>
                <div className='border-2 border-black rounded-full h-10 w-10 flex items-center 
                justify-center cursor-pointer bg-pink-500'>
                   <p className='text-3xl' onClick={()=>setOpenModal(true)}>+</p> 
                </div>
            </div>
            <div className='relative'>
                <input type='text'
                placeholder='Search for a chat ...'
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                className='p-2 rounded-lg text-center mb-4 w-3/4'
                />
            </div>
            <ul  className='space-y-6'>
                {matchedChats.length!==0?
                matchedChats.map(c=>(
                    <li key={c.id} className='flex space-x-3 shadow-sm p-2 cursor-pointer hover:shadow-md' onClick={()=>onChatClick(c)}>
                        <img src={c.profilePic} 
            alt={`Profile for ${c.name}`}
            className='rounded-full h-12 w-12'
            />
                        <div className=''>    
           <h3 className='font-semibold'>{c.name}</h3> 
             <p className='text-gray-700'>Hi its me {c.name}</p>
                        </div>
                      
                    </li>
                ))
                 :
                 <p className='text-gray-700'>No items match your search....</p>
                }
            </ul>
            {openModal&&
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='modal bg-pink-300 flex flex-col space-y-4 items-center p-6 rounded-lg shadow-lg'>
                <h1 className='text-lg font-semibold'>Add New Chat</h1>
                <div className='flex flex-col space-y-2 relative'>
                <label className='font-semibold'>Name:</label>
                <input type='text'
                placeholder='eg John Doe'
                onChange={handleInput}
                value={newChat.name}
                name='name'
                required
                className='rounded-lg text-center w-3/4 p-2'
                />
                </div>
                <div className='flex flex-col space-y-2 relative'>
                <label className='font-semibold'>PhoneNumber:</label>
                <input type='text'
                placeholder='eg 0715455422'
                onChange={handleInput}
                value={newChat.phoneNumber}
                name='phoneNumber'
                 className='rounded-lg text-center w-3/4 p-2'
                required
                />
                </div>
                <div className='flex space-x-8'>
                    <button onClick={cancel} className='p-2 bg-pink-400 rounded-lg'>Cancel</button>
                    <button onClick={addChat} className='p-2 bg-pink-400 rounded-lg'>Add</button>
                </div>
            </div>
             </div>
            }
           
        </div>
    )
}