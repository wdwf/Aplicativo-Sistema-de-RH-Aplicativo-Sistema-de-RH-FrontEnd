import { Link, useNavigate } from "react-router-dom";
import Cargo from "../../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Hourglass, RotatingLines } from "react-loader-spinner";
import CardCargo from "./CardCargo";
import { IoArrowBackSharp } from "react-icons/io5";
import { Search } from "lucide-react";

export default function ListaCargo() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const [cargo, setCargo] = useState<Cargo[]>([]);
  const [busca, setBusca] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Paginação e ordenação
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 5;


  async function buscarCargos() {
    try {
      await buscar("/cargo", (res: Cargo[]) => {
        setCargo(res);
      }, {
        headers: { Authorization: token }
      });
      setLoadingPage(false);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        console.log(error);
        handleLogout();
        navigate("/");
      }
    }
  }

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscarCargos();
    }
  }, [token]);

  useEffect(() => {
    setPaginaAtual(0);
  }, [busca]);

  const cargosFiltrados = cargo.filter(c =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const inicio = paginaAtual * itensPorPagina;
  const cargosPaginados = cargosFiltrados.slice(
    inicio,
    inicio + itensPorPagina
  );
  const totalPaginas = Math.ceil(cargosFiltrados.length / itensPorPagina);

  if (loadingPage) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="80"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-7xl">

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-6 sm:mb-8">
        <Link to="/home" className="flex items-center rounded-full p-2 sm:p-3 hover:bg-gray-200 
                                     hover:-translate-x-1 sm:hover:-translate-x-2 transition-all duration-300">

          <IoArrowBackSharp className="w-6 h-6 sm:w-7 sm:h-7 text-rh-primarygrey" />
        </Link>

        <div className="w-full flex flex-wrap justify-between items-center mb-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-rh-primarygrey mt-2 sm:mt-0">Lista de Cargos</h3>

          <div className="flex items-center px-3 py-1.5 border border-gray-600 rounded-lg text-sm w-72 gap-3">
            <input
              type="text"
              placeholder="Buscar cargo"
              className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
              onChange={(e) => setBusca(e.target.value)}
              autoComplete="off"
              value={busca}
            />
            <Search className="size-4 text-rh-primarygrey" />
          </div>
        </div>
      </div>

      {cargosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-250px)]">
          <p className="text-xl md:text-2xl font-semibold text-rh-primarygrey mt-4">
            Nenhum cargo encontrado.
          </p>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 justify-center">
            {cargosPaginados.map((cargo) => (
              <CardCargo key={cargo.id} cargo={cargo} />
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPaginaAtual((p) => Math.max(p - 1, 0))}
              disabled={paginaAtual === 0}
              className="bg-rh-primaryblue hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {paginaAtual + 1} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas - 1))}
              disabled={paginaAtual >= totalPaginas - 1}
              className="bg-rh-primaryblue hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
