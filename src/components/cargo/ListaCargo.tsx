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
  const [listaCargos, setListaCargos] = useState<Cargo[]>([])
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarCargos() {
    try {
      await buscar('/cargo', setListaCargos, {
        headers: { Authorization: token }
      })
      setLoadingPage(false);
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

  if (loadingPage) {
    return(
    <div className="flex justify-center items-center h-screen w-full">
     <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
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
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-rh-primarygrey mt-2 sm:mt-0">
          Lista de Cargos
        </h3>
      </div>
      {listaCargos.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-250px)]"> 
        
          <p className="text-xl md:text-2xl font-semibold text-rh-primarygrey mt-4">Nenhum cargo cadastrado.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {listaCargos.map((cargo) => (
          <CardCargo
            key={cargo.id}
            cargo={cargo}
          />
        ))}
      </div>
    </div>
  );
}

