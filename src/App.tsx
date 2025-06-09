
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
import Sobre from './pages/sobre/Sobre'
import ListaCargo from './components/ListaCargo'
import FormCargo from './components/FormCargo'
import DeletarCargo from './components/DeletarCargo'
import CalculoSalario from './components/CalculoSalario'



function App() {


  return (
    <div className="max-w-[1440px] mx-auto">
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/features-futuras" element={<Sobre />} />
              <Route path="/calcular-salario" element={<CalculoSalario />} />
              <Route path="/departamentos" element={<ListaDepartamento />} />
              <Route path="/cadastrar-departamento" element={<FormDepartamento />} />
              <Route path="/editar-departamento/:id" element={<FormDepartamento />} />
              <Route path="/deletar-departamento/:id" element={<DeleteDepartamento />} />
              <Route path="/cargos" element={<ListaCargo />} />
              <Route path="/cadastrar-cargo" element={<FormCargo />} />
              <Route path="/cadastrar-cargo/:id" element={<FormCargo />} />
              <Route path="/editar-cargo/:id" element={<FormCargo />} />
              <Route path="/deletar-cargo/:id" element={<DeletarCargo />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
