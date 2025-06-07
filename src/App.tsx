<<<<<<< HEAD
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom'
>>>>>>> 6b6b272ce4306629e5fef93482340adc066b1c47
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import { AuthProvider } from './contexts/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


import Navbar from './components/Navbar'

import { AuthProvider } from './contexts/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {
 

  return (
    <>
       <AuthProvider>
        <ToastContainer />
          <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        
        </AuthProvider> 
    </>
  )
}

export default App
