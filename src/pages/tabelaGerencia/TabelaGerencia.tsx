import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from "lucide-react";
import { FaPen } from "react-icons/fa6";
import { Table } from "../../components/table/table";
import { TableHeader } from "../../components/table/table-header";
import { TableRow } from "../../components/table/table-row";
import { TableCell } from "../../components/table/table-cell";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import { IoArrowBackSharp } from "react-icons/io5";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import noPicture from '../../assets/img/noPicture.png'
import { IconButton } from "../../components/table/icon-button";

export default function TabelaGerencia() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([])
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([])
  const [busca, setBusca] = useState('')


  async function buscarCargos() {
    try {
      await buscar('/usuario', (res: Usuario[]) => {
        setListaUsuarios(res);
        setUsuariosFiltrados(res);
      }, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        // handleLogout()
        console.log(error);

      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    if (token === '') return;
    if (!token) {
      ToastAlerta('Você precisa estar logado!', 'info')
      handleLogout();
      navigate('/')
    }
    else {
      buscarCargos()
    }
  }, [token])


  useEffect(() => {
    const resultado = listaUsuarios.filter(user =>
      user.nome.toLowerCase().includes(busca.toLowerCase()) ||
      user.usuario.toLowerCase().includes(busca.toLowerCase()) ||
      user.cargo?.nome?.toLowerCase().includes(busca.toLowerCase())
    )
    setUsuariosFiltrados(resultado)
  }, [busca, listaUsuarios])


  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center w-full md:w-auto mb-4 md:mb-0">
          <Link to="/home" className="flex items-center rounded-full gap-2 p-2 md:p-3 hover:bg-gray-200 hover:-translate-x-1 transition-all duration-300">
            <IoArrowBackSharp className="w-6 h-6 md:w-7 md:h-7" />
            <span className="sr-only">Voltar para Home</span>
          </Link>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-rh-primarygrey mt-2 md:mt-0-">
            Colaboradores
          </h3>
        </div>
        <div className='flex items-center px-3 py-2 border border-gray-600 rounded-lg text-sm w-full md:w-72 lg:w-96 gap-3'>
          <Search className='size-5 text-rh-primarygrey' />
          <input
            type='text'
            placeholder='Buscar colaborador...'
            className='bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0'
            onChange={(e) => setBusca(e.target.value)}
            autoComplete='off'
            value={busca}
          />
        </div>
      </div>

     <div className="overflow-x-auto rounded-lg shadow-md"> 
      <Table>
        <thead>
          <tr className='border-b border-gray-500'>
            <TableHeader className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Foto</TableHeader>
            <TableHeader className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Colaborador</TableHeader>
            <TableHeader className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cargo</TableHeader>
            <TableHeader className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Salario</TableHeader>
            <TableHeader className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ width: 64 }}>Editar</TableHeader>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <img src={user.foto.length > 10 ? user.foto : noPicture} alt="foto do usuario" className="w-10 h-10 object-cover border-2 border-gray-700 rounded-full flex-shrink-0" />
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-semibold text-sm'>
                      {user.nome}
                    </span>
                    <span className="text-xs">{user.usuario}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4">
                  <div className='flex flex-col gap-1'>
                    <span className="text-sm">{user.cargo.nome}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 px-4 text-sm">{user.cargo?.salario.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                <TableCell className="py-3 px-4 text-center">
                  <Link to={`/editar-perfil/${user.id}`} className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-rh-primaryblue text-white rounded-full hover:bg-rh-secondaryblue transition-colors shadow-sm">
                    <FaPen size={14}/>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={2} className="py-3 px-4 text-sm">
              
            </TableCell>
            <TableCell className='text-right py-3 px-4' colSpan={3}>
              <div className='inline-flex items-center gap-6 md:gap-8'>
                <span className="text-sm">
            
                </span>
                <div className='flex gap-1.5'>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronsLeft className='size-4' />
                  </IconButton>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronLeft className='size-4' />
                  </IconButton>
                  <IconButton
                    onClick={() => { }}
                    disabled
                  >
                    <ChevronRight className='size-4' />
                  </IconButton>
                  <IconButton
                    onClick={() => { }}
                    disabled
                  >
                    <ChevronsRight className='size-4' />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
     </div>
  )
}
