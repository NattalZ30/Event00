import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import Login from './components/login/Login'
import Signup from './components/login/Signup'

import Navbar from './components/Navbar'

import Home from './components/Home'
import CreateEvent from './components/CreateEvent'
import FindMyTickets from './components/FindMyTickets'

import Footer from './components/Footer'

function App() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/sign-up', '/find-my-tickets'];

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <div className='app'>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar username={username} isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/find-my-tickets' element={<FindMyTickets/>}/>
        <Route path='/create-event' element={<CreateEvent/>}/>
        <Route path='/login' element={<Login
        onStart={handleLogin} 
        username={username} 
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        />}/>
        <Route path='/sign-up' element={<Signup
        username={username} 
        setUsername={setUsername}
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword}/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
