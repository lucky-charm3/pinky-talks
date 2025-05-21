import {useContext} from 'react';
import {ChatContext} from './context.jsx';
import{useState} from 'react';
import{FaEye,FaEyeSlash} from 'react-icons/fa';
import {Link,useNavigate} from 'react-router-dom';
export default function Login()
{
    const{loggedUsers,loggedFormData,setLoggedFormData}=useContext(ChatContext);
    const[isShow,setIsShow]=useState(false);
    const[successMessage,setSuccessMessage]=useState('');
    const[showModal,setShowModal]=useState(false);
    let successful=successMessage==="✅Successfully Logged In";
    let navigate=useNavigate();
    function handleInput(e)
    {
        const{name,value}=e.target;
        setLoggedFormData(prev=>({...prev,[name]:value}))
    }
    function validator(e)
    {
        e.preventDefault();
        let user=loggedUsers.find(u=>(u.name===loggedFormData.name&&u.password===loggedFormData.password));
        setSuccessMessage(user?"✅Successfully Logged In":"❌Invalid User!");
        setShowModal(true)
    }
   function ok()
   {
    if(successful)
    {
        navigate('/welcome');
    }
    setShowModal(false);
    
   }
    return(
        <div>
            {/* <h2 className='pinky-talks text-7xl text-center font-bebas tracking-wide mt-24'>Pinky Talks</h2> */}
        <form onSubmit={validator} className='log-in-form mx-auto max-w-sm'>
            <div className='flex flex-col space-y-2'>
            <label>UserName:</label>
                <input type='text'
                placeholder='e.g JohnDoe'
                name='name'
                value={loggedFormData.name}
                onChange={handleInput}
                className='w-full rounded-lg text-center h-9'
                required
                />
            </div>
            <div className='relative flex flex-col space-y-2'>
             <label>Password </label>
                <input type={isShow?'text':'password'}
                placeholder='e.g ********'
                name='password'
                value={loggedFormData.password}
                onChange={handleInput}
                className='w-full rounded-lg text-center h-9'
                required
                />
                <div className='eye cursor-pointer absolute'>
                   {isShow?<FaEyeSlash onClick={()=>setIsShow(false)}/>:<FaEye onClick={()=>setIsShow(true)}/>}
                </div>
           
            </div>
            <button type='submit' className='log-in-button  bg-pink-500 rounded-lg p-2 hover:bg-pink-600'>Login</button>
            <div>
                <p>New Member?{' '}<Link to="/sign-up" className='underline' onClick={()=>setLoggedFormData({name:'',password:''})}>
                Sign Up
                </Link></p>
            </div>
        </form>
        {showModal&&
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center '>
            <div className='modal flex flex-col space-y-6 bg-pink-300 items-center justify-center p-10 rounded-xl'>
                <div className='text-lg'>{successMessage}</div>
                <button onClick={ok} className='p-2 bg-pink-400 rounded-lg w-10'>
Ok
                </button>
            </div>
        </div>
        }
        </div>
    )
}