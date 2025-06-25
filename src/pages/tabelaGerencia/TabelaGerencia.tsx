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
import noPicture from '../../assets/img/noPicture.png';
import { IconButton } from "../../components/table/icon-button";
import Select from 'react-select';

interface FilterOptions {
  [key: string]: boolean;
}

interface OptionType {
  value: string;
  label: string;
}

export default function TabelaGerencia() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState('');

  const [filtrosCargo, setFiltrosCargo] = useState<FilterOptions>({});
  const [filtrosDepartamento, setFiltrosDepartamento] = useState<FilterOptions>({});

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCargos() {
    try {
      await buscar('/usuario', (res: Usuario[]) => {
        setListaUsuarios(res);
        setUsuariosFiltrados(res);

        const nomesCargos = Array.from(new Set(res.map(user => user.cargo?.nome).filter(Boolean)));
        const nomesDepartamentos = Array.from(new Set(res.map(user => user.cargo?.departamento?.nome).filter(Boolean)));

        const filtrosIniciaisCargo: FilterOptions = {};
        const filtrosIniciaisDep: FilterOptions = {};

        nomesCargos.forEach(nome => filtrosIniciaisCargo[nome] = false);
        nomesDepartamentos.forEach(nome => filtrosIniciaisDep[nome] = false);

        setFiltrosCargo(filtrosIniciaisCargo);
        setFiltrosDepartamento(filtrosIniciaisDep);
      }, {
        headers: { Authorization: token }
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (token === '') return;
    if (!token) {
      ToastAlerta('Você precisa estar logado!', 'info');
      handleLogout();
      navigate('/');
    } else {
      buscarCargos();
    }
  }, [token]);

  useEffect(() => {
    aplicarFiltros();
  }, [busca, filtrosCargo, filtrosDepartamento, listaUsuarios]);

  function aplicarFiltros() {
    const cargosSelecionados = Object.keys(filtrosCargo).filter((nome) => filtrosCargo[nome]);
    const departamentosSelecionados = Object.keys(filtrosDepartamento).filter((nome) => filtrosDepartamento[nome]);

    const resultado = listaUsuarios.filter(user => {
      const nomeMatch = user.nome.toLowerCase().includes(busca.toLowerCase());
      const usuarioMatch = user.usuario.toLowerCase().includes(busca.toLowerCase());
      const cargoMatch = user.cargo?.nome?.toLowerCase().includes(busca.toLowerCase());

      const cargoSelecionadoMatch = cargosSelecionados.length === 0 || cargosSelecionados.includes(user.cargo?.nome);
      const depSelecionadoMatch = departamentosSelecionados.length === 0 || departamentosSelecionados.includes(user.cargo?.departamento?.nome);

      return (nomeMatch || usuarioMatch || cargoMatch) && cargoSelecionadoMatch && depSelecionadoMatch;
    });

    setUsuariosFiltrados(resultado);
  }

  function handleSelectCargo(options: OptionType[]) {
    const novoFiltro: FilterOptions = {};
    Object.keys(filtrosCargo).forEach(c => novoFiltro[c] = false);
    options.forEach(opt => novoFiltro[opt.value] = true);
    setFiltrosCargo(novoFiltro);
  }

  function handleSelectDepartamento(options: OptionType[]) {
    const novoFiltro: FilterOptions = {};
    Object.keys(filtrosDepartamento).forEach(d => novoFiltro[d] = false);
    options.forEach(opt => novoFiltro[opt.value] = true);
    setFiltrosDepartamento(novoFiltro);
  }

  const opcoesCargo: OptionType[] = Object.keys(filtrosCargo).map((cargo) => ({ value: cargo, label: cargo }));
  const opcoesDepartamento: OptionType[] = Object.keys(filtrosDepartamento).map((dep) => ({ value: dep, label: dep }));

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 ml-1 mt-6 mb-5 items-center">
          <Link to="/home" className="flex items-center rounded-full gap-2 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
            <IoArrowBackSharp className="w-7 h-7" />
          </Link>
          <h3 className="text-3xl font-medium text-rh-primarygrey">Colaboradores</h3>
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

      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <div className="w-full sm:w-1/2">
          <label className="font-semibold block mb-1 text-rh-primarygrey">Filtrar por Cargo</label>
          <Select
            isMulti
            options={opcoesCargo}
            placeholder="Selecione os cargos"
            onChange={handleSelectCargo}
            className="text-sm"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <label className="font-semibold block mb-1 text-rh-primarygrey">Filtrar por Departamento</label>
          <Select
            isMulti
            options={opcoesDepartamento}
            placeholder="Selecione os departamentos"
            onChange={handleSelectDepartamento}
            className="text-sm"
          />
        </div>
      </div>

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
          {usuariosFiltrados.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <img src={user.foto.length > 10 ? user.foto : noPicture} alt="foto do usuario" className="w-9 h-9 border-2 border-gray-700 rounded-full" />
              </TableCell>
              <TableCell>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-whitek'>{user.nome}</span>
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
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}></TableCell>
            <TableCell className='text-right' colSpan={3}>
              <div className='inline-flex items-center gap-8'>
  
                <div className='flex gap-1.5'>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronsLeft className='size-4' />
                  </IconButton>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronLeft className='size-4' />
                  </IconButton>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronRight className='size-4' />
                  </IconButton>
                  <IconButton onClick={() => { }} disabled>
                    <ChevronsRight className='size-4' />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}