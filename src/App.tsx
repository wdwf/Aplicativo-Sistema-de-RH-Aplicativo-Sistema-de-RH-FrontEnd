
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import FormDepartamento from './components/FormDepartamento'
import ListaDepartamento from './components/ListaDepartamento'
import DeleteDepartamento from './components/DeleteDepartamento'



function App() {
 

  return (
       <AuthProvider>
        <ToastContainer />
          <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
               <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
               <Route path="/departamento" element={<ListaDepartamento />} />
              <Route path="/cadastrardepartamento" element={<FormDepartamento />} />
              <Route path="/editardepartamento/:id" element={<FormDepartamento />} />
              <Route path="/deletardepartamento/:id" element={<DeleteDepartamento />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider> 
  )
}

export default App
