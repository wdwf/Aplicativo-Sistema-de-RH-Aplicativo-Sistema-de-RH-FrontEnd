import { Link, useNavigate } from "react-router-dom";
import Cargo from "../../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Hourglass } from "react-loader-spinner";
import CardCargo from "./CardCargo";
import { IoArrowBackSharp } from "react-icons/io5";
import { Search } from "lucide-react";

export default function ListaCargo() {

  const navigate = useNavigate();
  window.scrollTo(0, 0);
  const [cargo, setCargo] = useState<Cargo[]>([]);
  const [listaCargos, setListaCargos] = useState<Cargo[]>([])
  const [cargosFiltrados, setCargosFiltrados] = useState<Cargo[]>([]);
  const [busca, setBusca] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarCargos() {
    try {
       await buscar("/cargo", (res: Cargo[]) => {
              setCargo(res);
              setCargosFiltrados(res);
            },  {
        headers: { Authorization: token }
      });
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

 useEffect(() => {
    const resultado = cargo.filter(dep =>
      dep.nome.toLowerCase().includes(busca.toLowerCase())
    );
    setCargosFiltrados(resultado);
  }, [busca, cargo]);

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
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex gap-3 ml-1 items-center">
          <Link to="/home" className="flex items-center rounded-full gap-2 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
            <IoArrowBackSharp className="w-7 h-7 text-rh-primarygrey" />
          </Link>
          <h3 className="text-3xl font-medium text-rh-primarygrey">
            Lista de Cargos
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
          cargosFiltrados.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="text-xl font-semibold text-rh-primarygrey mt-4">Nenhum cargo encontrado.</p>
            </div>
          ) : (
            cargosFiltrados.map((cargo) => (
              <CardCargo
                key={cargo.id}
                cargo={cargo}
              />
            ))
          )
        }
      </div>
    </div>
  )
}
