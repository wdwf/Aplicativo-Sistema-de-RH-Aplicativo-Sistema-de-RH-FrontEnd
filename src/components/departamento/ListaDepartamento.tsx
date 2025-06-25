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

function ListaDepartamento() {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const [departamento, setDepartamento] = useState<Departamento[]>([]);
  const [departamentosFiltrados, setDepartamentosFiltrados] = useState<Departamento[]>([]);
  const [busca, setBusca] = useState('');
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

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

  useEffect(() => {
    const resultado = departamento.filter(dep =>
      dep.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setDepartamentosFiltrados(resultado);
  }, [busca, departamento]);

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
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex gap-3 ml-1 items-center">
          <Link to="/home" className="flex items-center rounded-full gap-2 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
            <IoArrowBackSharp className="w-7 h-7 text-rh-primarygrey" />
          </Link>
          <h3 className="text-3xl font-medium text-rh-primarygrey">
            Lista de Departamentos
          </h3>
        </div>

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

      <div className="flex flex-wrap gap-4">
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
      </div>
    </div>
  )
}

export default ListaDepartamento;
