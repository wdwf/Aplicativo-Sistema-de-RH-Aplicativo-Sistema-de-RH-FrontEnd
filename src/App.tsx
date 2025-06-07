import './App.css'

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
