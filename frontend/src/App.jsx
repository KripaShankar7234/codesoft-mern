import React, { useState } from 'react'   // ✅ FIX HERE
import './App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signin from './pages/Signin'
import Navbar from './components/Navbar'
import View from './pages/View'
import Cart from './pages/Cart'
import Footer from './pages/Footer'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LayoutApp() {
  const location = useLocation()

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signin"

  const [cart, setCart] = useState([])
  const [searchItem, setSearch] = useState("")

  function cartData(ele) {
    ele.qty = 1

    // ✅ FIX: use _id (MongoDB)
    let find = cart.find((value) => value._id === ele._id)
    if (find) {
      return toast.error('Item already exists in cart!')
    }

    setCart([...cart, ele])
    toast.success("Item added to cart!")
  }

  function search(searchItem) {
    setSearch(searchItem)
  }

  return (
    <>
      {!hideLayout && <Navbar cart={cart} search={search} />}

      <Routes>
        <Route path='/' element={<Home cartData={cartData} searchItem={searchItem} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/cart' element={<Cart cart={cart} />} />
        <Route path='/view' element={<View />} />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} pauseOnHover />

      {!hideLayout && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LayoutApp />
    </BrowserRouter>
  )
}

export default App
