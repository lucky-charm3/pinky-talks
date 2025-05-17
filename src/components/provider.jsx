import {useState} from 'react';
import {ChatContext} from './context.jsx';
import {loggedInUsers} from '../database/logged-in.jsx';
import {chatUsers} from '../database/chats.jsx';
export default function ChatProvider({children})
{
    const[loggedUsers,setLoggedUsers]=useState(loggedInUsers);
    const[loggedFormData,setLoggedFormData]=useState({name:'',password:''});
    const[signedFormData,setSignedFormData]=useState({name:'',password:'',email:'',phoneNumber:''});
    return(
        <ChatContext.Provider value={{loggedUsers,setLoggedUsers
            ,signedFormData,setSignedFormData,
        chatUsers,loggedFormData,setLoggedFormData}}>
            {children}
        </ChatContext.Provider>
    )
}