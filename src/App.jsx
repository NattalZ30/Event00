import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import './App.css'
import { useState } from 'react'

import Login from './components/login/Login'
import Signup from './components/login/Signup'

import Navbar from './components/Navbar'

import Home from './components/Home'
import Event from './components/Event'
import CreateEvent from './components/CreateEvent'
import FindMyTickets from './components/FindMyTickets'

import Footer from './components/Footer'
import MyAccount from './components/MyAccount'

import GoogleCalendar from './components/GoogleCalender'

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
        <Route path="/event/:event_id" element={<Event username={username}/>}/>
        <Route path="/event/:event_id/add-to-calender" element={<GoogleCalendar/>}/>
        <Route path='/find-my-tickets' element={<FindMyTickets/>}/>
        <Route path='/create-event' element={<CreateEvent username={username}/>}/>
        <Route path='/my-account' element={<MyAccount username={username} isLoggedIn={isLoggedIn}/>}/>
        <Route path='/login' element={<Login
        onStart={handleLogin} 
        username={username} 
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword}
        setIsLoggedIn={setIsLoggedIn}
        />}/>
        <Route path='/sign-up' element={<Signup/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
