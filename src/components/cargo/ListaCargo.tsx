import { Link, useNavigate } from "react-router-dom";
import Cargo from "../../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Hourglass } from "react-loader-spinner";
import CardCargo from "./CardCargo";
import { IoArrowBackSharp } from "react-icons/io5";

export default function ListaCargo() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const [listaCargos, setListaCargos] = useState<Cargo[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  // Paginação e ordenação
  const [paginaAtual, setPaginaAtual] = useState(0);
  const itensPorPagina = 5;

  type CampoOrdenacao = "salario" | "nivel";
  const [ordenadoPor, setOrdenadoPor] = useState<CampoOrdenacao>("salario");
  const [ascendente, setAscendente] = useState(true);

  async function buscarCargos() {
    try {
      await buscar("/cargo", setListaCargos, {
        headers: { Authorization: token },
      });
      setLoadingPage(false);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (token === "") return;
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscarCargos();
    }
  }, [token]);

  const ordenar = (campo: CampoOrdenacao) => {
    if (campo === ordenadoPor) {
      setAscendente(!ascendente);
    } else {
      setOrdenadoPor(campo);
      setAscendente(true);
    }
    setPaginaAtual(0);
  };

  const comparar = (a: Cargo, b: Cargo, campo: CampoOrdenacao) => {
    if (campo === "salario") {
      const valorA = Number(a.salario) || 0;
      const valorB = Number(b.salario) || 0;
      return ascendente ? valorA - valorB : valorB - valorA;
    }

    const valorA = a[campo]?.toString().toLowerCase() || "";
    const valorB = b[campo]?.toString().toLowerCase() || "";
    if (valorA < valorB) return ascendente ? -1 : 1;
    if (valorA > valorB) return ascendente ? 1 : -1;
    return 0;
  };

  const cargosOrdenados = [...listaCargos].sort((a, b) =>
    comparar(a, b, ordenadoPor)
  );
  const inicio = paginaAtual * itensPorPagina;
  const cargosPaginados = cargosOrdenados.slice(
    inicio,
    inicio + itensPorPagina
  );
  const totalPaginas = Math.ceil(listaCargos.length / itensPorPagina);

  if (loadingPage) {
    return (
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
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
          <IoArrowBackSharp className="w-7 h-7" />
        </Link>
        <div className="w-full flex flex-wrap justify-between items-center mb-6">
          <h3 className="text-3xl font-medium text-rh-primarygrey">
            Lista de Cargos
          </h3>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => ordenar("salario")}
              className={`px-2 py-1 rounded border ${
                ordenadoPor === "salario"
                  ? "bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white"
                  : "bg-rh-primary-white hover:bg-blue-100"
              }`}
            >
              Ordenar por Salário{" "}
              {ordenadoPor === "salario" && (ascendente ? "▲" : "▼")}
            </button>

            <button
              onClick={() => ordenar("nivel")}
              className={`px-3 py-2 rounded border ${
                ordenadoPor === "nivel"
                  ? "bg-rh-primaryblue hover:bg-blue-500 text-rh-primary-white"
                  : "bg-rh-primary-white hover:bg-blue-100"
              }`}
            >
              Ordenar por Nível{" "}
              {ordenadoPor === "nivel" && (ascendente ? "▲" : "▼")}
            </button>
          </div>
        </div>
      </div>

      {listaCargos.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <p className="text-xl font-semibold text-rh-primarygrey mt-4">
            Nenhum cargo cadastrado.
          </p>
        </div>
      ) : (
        <div>
          {/* Lista de Cargos */}
          <div className="overflow-x-auto">
            <div className="flex flex-wrap gap-4">
              {cargosPaginados.map((cargo) => (
                <CardCargo key={cargo.id} cargo={cargo} />
              ))}
            </div>
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
      )}
    </div>
  );
}
