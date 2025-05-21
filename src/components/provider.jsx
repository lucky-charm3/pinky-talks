import {useState,useEffect} from 'react';
import {ChatContext} from './context.jsx';
import {chatUsers} from '../database/chats.jsx';
import {loggedInUsers} from '../database/logged-in.jsx';
export default function ChatProvider({children})
{
    const[loggedUsers,setLoggedUsers]=useState(loggedInUsers);
    const[inChatUsers,setInChatUsers]=useState(chatUsers);
    const[loggedFormData,setLoggedFormData]=useState({name:'',password:''});
    const[signedFormData,setSignedFormData]=useState({name:'',password:'',email:'',phoneNumber:''});
    const[theme, setTheme]=useState('light');
    useEffect(()=>{
        document.body.className=theme;
    },[theme])
    return(
        <ChatContext.Provider value={{loggedUsers,setLoggedUsers
            ,signedFormData,setSignedFormData,inChatUsers,
        setInChatUsers,loggedFormData,setLoggedFormData,theme,setTheme}}>
            {children}
        </ChatContext.Provider>
    )
}