import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

import Home from './components/Home'
import Insights from './components/Insights'
import AboutUs from './components/AboutUs'

import Footer from './components/Footer'
import Foundation from './components/Foundation'

function App() {

  return (
    <div className='app'>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about-us' element={<AboutUs></AboutUs>}></Route>
        <Route path='/insights' element={<Insights></Insights>}></Route>
        <Route path='/foundation' element={<Foundation ></Foundation>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
