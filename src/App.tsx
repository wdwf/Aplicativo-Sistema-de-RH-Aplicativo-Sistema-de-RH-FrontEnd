import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import { AuthProvider } from './contexts/AuthContext'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'


function App() {
  return (
    <>
       <AuthProvider>
        <ToastContainer />
          <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
               <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        
        </AuthProvider> 
    </>
  )
}

export default App
