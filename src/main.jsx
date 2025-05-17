import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import ChatProvider from './components/provider.jsx';
import './index.css'
import Login from './components/login.jsx';
import Welcome from './components/welcome.jsx';
import SignUp from './components/signup.jsx';
import ChatPage from './components/chatpage.jsx';
import App from './App.jsx';
let router=createBrowserRouter([
  {
  path:'/',
  element:<App/>,
  children:[
    {
      index:true,
      element:<Login/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/welcome',
      element:<Welcome/>
    },
    {
      path:'/sign-up',
      element:<SignUp/>
    },
    {
      path:'/chat-page',
      element:<ChatPage/>
    }
  ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatProvider>
   <RouterProvider router={router}/>
    </ChatProvider>
  </StrictMode>,
)
