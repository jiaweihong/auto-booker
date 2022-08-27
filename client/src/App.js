
import Navbar from './Navbar.js'
import MainPage from './MainPage.js'
import FaqPage from './FaqPage.js'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/faq' element={<FaqPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
