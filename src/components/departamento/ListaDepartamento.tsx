import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Departamento from "../../models/Departamento";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import CardDepartamento from "./CardDepartamento";
import { IoArrowBackSharp } from "react-icons/io5";

function ListaDepartamento() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const [departamento, setDepartamento] = useState<Departamento[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);
  const [ordenadoPor, setOrdenadoPor] = useState<"ramal">("ramal");
  const [ascendente, setAscendente] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 5;
  const [filtroAndar, setFiltroAndar] = useState<string>("");

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarDepartamento() {
    try {
      await buscar("/departamento", setDepartamento, {
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

  const ordenar = () => {
    setAscendente(!ascendente);
    setPaginaAtual(0);
  };

  const comparar = (a: Departamento, b: Departamento) => {
    const valorA = a[ordenadoPor];
    const valorB = b[ordenadoPor];

    const numA = Number(valorA);
    const numB = Number(valorB);

    if (!isNaN(numA) && !isNaN(numB)) {
      return ascendente ? numA - numB : numB - numA;
    }

    const strA = String(valorA).toLowerCase();
    const strB = String(valorB).toLowerCase();

    if (strA < strB) return ascendente ? -1 : 1;
    if (strA > strB) return ascendente ? 1 : -1;
    return 0;
  };

  // Filtro por andar com parseInt
  const departamentosFiltrados = departamento.filter((d) => {
    if (filtroAndar === "") return true;

    const andar = parseInt(String(d.andar), 10);
    const filtro = parseInt(filtroAndar, 10);

    return !isNaN(andar) && andar === filtro;
  });

  const departamentosOrdenados = [...departamentosFiltrados].sort(comparar);

  const inicio = paginaAtual * itensPorPagina;
  const departamentosPaginados = departamentosOrdenados.slice(
    inicio,
    inicio + itensPorPagina
  );
  const totalPaginas = Math.ceil(
    departamentosFiltrados.length / itensPorPagina
  );

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
    <div className="w-full p-6">
      <div className="flex gap-3 ml-1 my-6 items-center">
        <Link
          to="/home"
          className="flex items-center rounded-full gap-2 mb-6 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300"
        >
          <IoArrowBackSharp className="w-7 h-7 text-rh-primarygrey" />
        </Link>
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4 w-full">
          <h3 className="text-3xl font-medium text-rh-primarygrey">
            Lista de Departamentos
          </h3>

          {/* Campo para filtro por andar */}
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Pesquisar Andar"
              value={filtroAndar}
              onChange={(e) => setFiltroAndar(e.target.value)}
              className="border p-2 rounded w-48 shadow-sm focus:outline-none hover:bg-blue-100"
            />
            {/* Botão ordenar por Ramal */}
            <button
              onClick={ordenar}
              className="bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white px-3 py-2 rounded shadow transition-all"
            >
              Ordenar por Ramal {ascendente ? "▲" : "▼"}
            </button>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="flex flex-wrap gap-4">
        {departamento.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-xl font-semibold text-rh-primarygrey mt-4">
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
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPaginaAtual((p) => Math.max(p - 1, 0))}
          disabled={paginaAtual === 0}
          className="bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {paginaAtual + 1} de {totalPaginas}
        </span>
        <button
          onClick={() =>
            setPaginaAtual((p) => Math.min(p + 1, totalPaginas - 1))
          }
          disabled={paginaAtual >= totalPaginas - 1}
          className="bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}

export default ListaDepartamento;
