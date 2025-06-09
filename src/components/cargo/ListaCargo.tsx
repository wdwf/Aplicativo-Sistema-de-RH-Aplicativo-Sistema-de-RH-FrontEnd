import { Link, useNavigate } from "react-router-dom";
import Cargo from "../../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Hourglass, RotatingLines } from "react-loader-spinner";
import arrowBlack from "../../assets/img/arrowBlack.png";
import CardCargo from "./CardCargo";

export default function ListaCargo() {

  const navigate = useNavigate();

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
    return <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
  }

  return (
    <div className="w-full p-6">
      <div className="flex gap-3 ml-1 my-6 items-center">
        <Link to="/home" className="flex items-center rounded-full gap-2 mb-6 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
          <img src={arrowBlack} alt="Seta para voltar" className="-scale-x-100" width={24} height={24} />
        </Link>
        <h3 className="text-3xl font-medium text-rh-primarygrey mb-6">
          Lista de Cargos
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {
          listaCargos.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="text-xl font-semibold text-rh-primarygrey mt-4">Nenhum cargo cadastrado.</p>
            </div>
          )
        }
        {
          listaCargos.map((cargo) => (
            <CardCargo key={cargo.id} cargo={cargo} />
          ))
        }
      </div>
    </div>
  )
}
