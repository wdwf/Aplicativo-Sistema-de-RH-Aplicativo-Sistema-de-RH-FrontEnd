import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Departamento from "../../models/Departamento";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import CardDepartamento from "./CardDepartamento";
import { IoArrowBackSharp } from "react-icons/io5";
import { Search } from "lucide-react"; // Ícone da lupa
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

function ListaDepartamento() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const [departamento, setDepartamento] = useState<Departamento[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 5;
  const [filtroAndar, setFiltroAndar] = useState<string>("");
  const [departamentosFiltradosx, setDepartamentosFiltrados] = useState<Departamento[]>([]);
  const [busca, setBusca] = useState('');

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token;

  async function buscarDepartamento() {
    try {
      await buscar("/departamento", (res: Departamento[]) => {
        setDepartamento(res);
        setDepartamentosFiltrados(res);
      }, {
        headers: { Authorization: token },
      });
      setIsLoadingPage(false);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") return;

    if (!token) {
      ToastAlerta("Você precisa estar Logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscarDepartamento();
    }
  }, [token]);

  const departamentosFiltrados = departamento.filter((d) => {
    const nomeMatch = d.nome.toLowerCase().includes(busca.toLowerCase());
    const andarMatch =
      filtroAndar === "" ||
      parseInt(String(d.andar), 10) === parseInt(filtroAndar, 10);

    return nomeMatch && andarMatch;
  });

  const inicio = paginaAtual * itensPorPagina;
  const departamentosPaginados = departamentosFiltrados.slice(
    inicio,
    inicio + itensPorPagina
  );
  const totalPaginas = Math.ceil(
    departamentosFiltrados.length / itensPorPagina
  );

  useEffect(() => {
    setPaginaAtual(0);
  }, [busca]);

  useEffect(() => {
    setPaginaAtual(0);
  }, [filtroAndar]);

  if (isLoadingPage) {
    return (
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="24"
        visible={true}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6 sm:mb-8">
        <Link
          to="/home"
          className="flex items-center rounded-full p-2 sm:p-3 hover:bg-gray-200 hover:-translate-x-1 sm:hover:-translate-x-2 transition-all duration-300"
        >
          <IoArrowBackSharp className="w-6 h-6 sm:w-7 sm:h-7 text-rh-primarygrey" />
        </Link>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4 w-full">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-rh-primarygrey mt-2 sm:mt-0">
            Lista de Departamentos
          </h3>

          {/* Campo para filtro por andar */}
          <div className="flex items-center px-3 py-1.5 border border-gray-600 rounded-lg text-sm w-72 gap-3">

            <input
              type="text"
              placeholder="Buscar departamento"
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
              onChange={(e) => setBusca(e.target.value)}
              autoComplete="off"
              value={busca}
            />
            <Search className="size-4 text-rh-primarygrey" />
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="flex flex-wrap gap-4">
        {departamento.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-250px)]">
            <p className="text-xl md:text-2xl font-semibold text-rh-primarygrey mt-4">
              Nenhum departamento cadastrado.
            </p>
          </div>
        ) : (
          departamentosPaginados.map((d) => (
            <CardDepartamento key={d.id} departamento={d} />
          ))
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-center gap-6 items-center mt-6">
        <button
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 0))}
          disabled={paginaAtual === 0}
          className="cursor-pointer bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white px-4 py-2 rounded disabled:opacity-50"
        >
          <IoIosArrowBack />
        </button>
        <span>
          Página {paginaAtual + 1} de {totalPaginas}
        </span>
        <button
          onClick={() =>
            setPaginaAtual((p) => Math.min(p + 1, totalPaginas - 1))
          }
          disabled={paginaAtual >= totalPaginas - 1}
          className="cursor-pointer bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white px-4 py-2 rounded disabled:opacity-50"
        >
          <IoIosArrowForward />
        </button>

        {/* <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
          <div className="flex gap-3 ml-1 items-center">
            <Link to="/home" className="flex items-center rounded-full gap-2 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
              <IoArrowBackSharp className="w-7 h-7 text-rh-primarygrey" />
            </Link>
            <h3 className="text-3xl font-medium text-rh-primarygrey">
              Lista de Departamentos
            </h3>
          </div>

          
        </div> */}

        {/* <div className="flex flex-wrap gap-4">
          {
            departamentosFiltrados.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-xl font-semibold text-rh-primarygrey mt-4">Nenhum departamento encontrado.</p>
              </div>
            ) : (
              departamentosFiltrados.map((departamento) => (
                <CardDepartamento
                  key={departamento.id}
                  departamento={departamento}
                />
              ))
            )
          }
        </div> */}
      </div>
    </div>
  );
}

export default ListaDepartamento;