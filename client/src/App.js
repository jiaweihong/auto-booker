
import Navbar from './Navbar.js'
import main from './main.js'
import FaqPage from './FaqPage.js'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
  document.title = "Autobooker";

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<main />}></Route>
        <Route path='/faq' element={<FaqPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
