import {FaSun,FaMoon} from 'react-icons/fa';
import {ChatContext} from './context.jsx';
import {useContext} from 'react';
export default function Header()
{
    const{loggedUsers,loggedFormData,signedFormData,theme,setTheme}=useContext(ChatContext);
    const currentUser=loggedUsers.find(user=>(user.name===signedFormData.name)||(user.name===loggedFormData.name));

    return(
        <header className='flex justify-around bg-pink-300 p-4 fixed w-full items-center shadow-md z-50'>
            <div className='flex space-x-4 items-center'>
            <img src={currentUser.profilePic} 
            alt={`Profile for ${currentUser.name}`}
            className='rounded-full h-12 w-12'
            />
            <h1 className='text-2xl font-semibold'>{currentUser.name}</h1>
            </div>
            <div className='border-black border-2 rounded-full p-3 cursor-pointer'>
            {theme==='light'?<FaMoon onClick={()=>setTheme('dark')}/>:<FaSun onClick={()=>setTheme('light')}/>}
                </div>
        </header>
    )
}