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
import ListaDepartamento from './components/departamento/ListaDepartamento'
import DeleteDepartamento from './components/departamento/DeleteDepartamento'
import Sobre from './pages/sobre/Sobre'
import ListaCargo from './components/cargo/ListaCargo'
import Planejamos from './pages/futuro/Planejamos'
import NotFound from './pages/notFound/NotFound'
import FormDepartamento from './components/departamento/FormDepartamento'
import FormCargo from './components/cargo/FormCargo'
import DeletarCargo from './components/cargo/DeletarCargo'
import EditarPerfil from './pages/perfil/EditarPerfil'
import Perfil from './pages/perfil/Perfil'
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
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/features-futuras" element={<Planejamos />} />
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
              <Route path="*" element={<NotFound />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/editar-perfil" element={<EditarPerfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
