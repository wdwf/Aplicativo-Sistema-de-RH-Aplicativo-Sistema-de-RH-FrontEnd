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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadinPage, setIsLoadingPage] = useState<boolean>(true);

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
    if (token === "") {
      return;
    }
    if (!token) {
      ToastAlerta("Você precisa estar Logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscarDepartamento();
    }
  }, [token]);

  if (isLoadinPage) {
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
        <Link to="/home" className="flex items-center rounded-full p-2 sm:p-3 hover:bg-gray-200 
                                     hover:-translate-x-1 sm:hover:-translate-x-2 transition-all duration-300">
          <IoArrowBackSharp className="w-6 h-6 sm:w-7 sm:h-7 text-rh-primarygrey" />
        </Link>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-rh-primarygrey mt-2 sm:mt-0">
          Lista de Departamentos
        </h3>
      </div>
     
      {departamento.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-250px)]"> 
          <p className="text-xl md:text-2xl font-semibold text-rh-primarygrey mt-4">Nenhum departamento cadastrado.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {departamento.map((departamentoItem) => (
          <CardDepartamento
            key={departamentoItem.id}
            departamento={departamentoItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ListaDepartamento;
