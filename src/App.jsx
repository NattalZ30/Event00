import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

import Login from './components/login/Login'
import Signup from './components/login/Signup'

import Navbar from './components/Navbar'

import Home from './components/Home'
import Insights from './components/Insights'
import AboutUs from './components/AboutUs'

import Footer from './components/Footer'
import Foundation from './components/Foundation'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/sign-up'];

  return (
    <div className='app'>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about-us' element={<AboutUs></AboutUs>}></Route>
        <Route path='/insights' element={<Insights></Insights>}></Route>
        <Route path='/foundation' element={<Foundation ></Foundation>}></Route>
        <Route path='/login' element={<Login ></Login>}></Route>
        <Route path='/sign-up' element={<Signup ></Signup>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
