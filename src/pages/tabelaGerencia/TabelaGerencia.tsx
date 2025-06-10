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
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 ml-1 mt-6 mb-5 items-center">
          <Link to="/home" className="flex items-center rounded-full gap-2 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
            <IoArrowBackSharp className="w-7 h-7" />
          </Link>
          <h3 className="text-3xl font-medium text-rh-primarygrey">
            Colaboradores
          </h3>
        </div>
        <div className='flex items-center px-3 py-1.5 border border-gray-600 rounded-lg text-sm w-72 gap-3'>
          <Search className='size-4 text-rh-primarygrey' />
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

      {/* <div className='flex flex-col gap-4 px-12 py-4'> */}


      <Table>
        <thead>
          <tr className='border-b border-gray-500'>
            <TableHeader>Foto</TableHeader>
            <TableHeader>Colaborador</TableHeader>
            <TableHeader>Cargo</TableHeader>
            <TableHeader>Salario</TableHeader>
            <TableHeader style={{ width: 64 }}>Editar</TableHeader>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <img src={user.foto.length > 10 ? user.foto : noPicture} alt="foto do usuario" className="w-9 h-9 border-2 border-gray-700 rounded-full" />
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold text-whitek'>
                      {user.nome}
                    </span>
                    <span>{user.usuario}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <span>{user.cargo.nome}</span>
                  </div>
                </TableCell>
                <TableCell>{user.cargo?.salario.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</TableCell>
                <TableCell>
                  <Link to={`/editar-perfil/${user.id}`} className="flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                    <FaPen />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              {/* Mostrando {attendees.length} de {total} itens */}
            </TableCell>
            <TableCell className='text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
                <span>
                  {/* Página {page} de {totalAttendeens} */}
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
  )
}
