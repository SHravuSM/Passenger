import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Passenger from './components/Passenger';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/passenger/:passenger' element={<Passenger />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div >
  )
}