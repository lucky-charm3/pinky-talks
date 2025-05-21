import {useContext} from 'react';
import {ChatContext} from './context.jsx';
import{useState} from 'react';
import{FaEye,FaEyeSlash} from 'react-icons/fa';
import {Link,useNavigate} from 'react-router-dom';
import{v4 as uuidv4} from 'uuid';
export default function SignUp()
{
    const{signedFormData, setSignedFormData, loggedUsers, setLoggedUsers}=useContext(ChatContext);
    const[isShow,setIsShow]=useState(false);
    const[errors,setErrors]=useState({name:null,password:null,phoneNumber:null,email:null});
    const[successMessage,setSuccessMessage]=useState(null);
    const[openModal,setOpenModal]=useState(false);
    let success=successMessage==="✅Successfully signed up!";
    let navigate=useNavigate();
     const validationRules={
            name:
            {
            regex:/^[a-zA-Z0-9_ ]{3,16}$/,
            errorMessage:"A username should contain 3-16 characters with no special characters"
            },
            email:
            {
            regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            errorMessage:"Please input correct email"
            },
            password:
            {
            regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            errorMessage:'A password should contain atleast 8 characters, 1 lowercase character, 1 uppercase character, 1 digit and 1 special character'
            },
            phoneNumber:
            {
                regex:/^\+?[0-9]{7,15}$/,
                errorMessage:'Please input correct phone number'
            }
    }
    const handleInput=(e)=>
    {
        const{name,value}=e.target;
        setSignedFormData(prev=>({...prev,[name]:value}));
        let rule=validationRules[name];
        if(rule)
        {
            let isValid=rule.regex.test(value);
            setErrors(prev=>({...prev,[name]:isValid||value===''?null:rule.errorMessage}))
        }
    }
    const validator=(e)=>{
   e.preventDefault();
   let user=loggedUsers.find(u=>(u.name===signedFormData.name)&&(u.password===signedFormData.password));
   if(user)
   {
    setSuccessMessage('❌User Already Exist');
    return;
   }
   let newUser={
    id:uuidv4(),
    name:signedFormData.name,
    password:signedFormData.password,
    phoneNumber:signedFormData.phoneNumber,
    email:signedFormData.email,
    profilePic:'./profile-picha.webp',
    status:Math.random()>0.5?"online":"offline"
}
   setLoggedUsers(prev=>([...prev,newUser]));
   setSuccessMessage('✅Successfully signed up!');
   setOpenModal(true);
    }
    const ok=()=>{
   if(success)
   {
navigate('/welcome');
   }
  setOpenModal(false);
    }
    return(
        <div>
             {/* <h2 className='pinky-talks text-7xl text-center font-bebas tracking-wide mt-24'>Pinky Talks</h2> */}
            <form className='sign-up-form' onSubmit={validator}>
            <div className='flex flex-col space-y-2'>
            <label>UserName:</label>
                <input type='text'
                placeholder='e.g JohnDoe'
                name='name'
                value={signedFormData.name}
                onChange={handleInput}
                className='rounded-lg text-center h-9'
                required
                />
                 <div className='text-red-500'>
                    {errors.name}
                </div>
            </div>
            <div className='relative flex flex-col space-y-2'>
            <label>Password:</label>
                <input type={isShow?'text':'password'}
                placeholder='e.g ********'
                name='password'
                value={signedFormData.password}
                onChange={handleInput}
                className='rounded-lg text-center h-9'
                required
                />
                <div className='text-red-500'>
                    {errors.password}
                </div>
                <div className='eye absolute cursor-pointer'>
                    {isShow?<FaEyeSlash onClick={()=>setIsShow(false)}/>:<FaEye onClick={()=>setIsShow(true)}/>}
                </div>
            </div>
            <div className='flex flex-col space-y-2'>
            <label>Phone Number:</label>
                <input type='text'
                placeholder='e.g 0715455422'
                name='phoneNumber'
                value={signedFormData.phoneNumber}
                onChange={handleInput}
                className='rounded-lg text-center h-9'
                required
                />
                <div className='text-red-500'>
                    {errors.phoneNumber}
                </div>
                 
            </div>
            <div className='flex flex-col space-y-2'>
            <label>Email:</label>
                <input type='email'
                placeholder='e.g johnDoe@example.com'
                name='email'
                value={signedFormData.email}
                onChange={handleInput}
                className='rounded-lg text-center h-9'
                required
                />
               <div className='text-red-500'>
                    {errors.email}
                </div>
            </div>
<button type='submit' className='sign-up-button bg-pink-500 rounded-lg p-2 hover:bg-pink-600'>Sign Up</button>
<div>
    <p>Already a member? <Link to='/login' className='underline' onClick={()=>setSignedFormData({name:'',password:'',email:'',phoneNumber:''})}>
    Login
    </Link></p>
</div>
            </form>
            {openModal&&
            <div className='flex items-center justify-center inset-0 absolute bg-black bg-opacity-50'>
                <div className='modal pop-up flex flex-col space-y-6 bg-pink-300 items-center justify-center rounded-xl'>
                    <p className='text-lg'>{successMessage}</p>
                    <button onClick={ok} className='p-2 bg-pink-400 rounded-lg w-10'>
                        Ok
                        </button>
                </div>
            </div>
            }
            
        </div>
    )
}