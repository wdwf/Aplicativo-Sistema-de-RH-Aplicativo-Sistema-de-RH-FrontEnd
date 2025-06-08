import { useNavigate } from "react-router-dom";
import CardCargo from "./CardCargo";
import Cargo from "../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { Hourglass, RotatingLines } from "react-loader-spinner";

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
    console.log('token', token);

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
    <div className="flex justify-center w-full my-4">
      <div className="container flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
          {
            listaCargos.map((cargo) => (
              <CardCargo key={cargo.id} cargo={cargo} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
