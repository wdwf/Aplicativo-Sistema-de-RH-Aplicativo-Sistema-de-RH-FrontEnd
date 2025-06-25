import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Hourglass, RotatingLines } from 'react-loader-spinner';
import colbgleft from "../../assets/img/colbgleft.png";
import colbgright from "../../assets/img/colbgright.png";
import Cargo from '../../models/Cargo';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar, deletar } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';

export default function DeletarCargo() {

  const navigate = useNavigate();

  const [cargo, setCargo] = useState<Cargo>({} as Cargo)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingPage, setLoadingPage] = useState(true);


  const { usuario, handleLogout, isAuthLoading } = useContext(AuthContext)
  const token = usuario?.token

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/cargo/${id}`, setCargo, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthLoading) {
      if (!token) {
        ToastAlerta('Você precisa estar logado!', 'info')
        navigate('/')
      }
      else {
        if (id !== undefined) {
          buscarPorId(id)
        }
        setLoadingPage(false);
      }
    }
  }, [isAuthLoading, token, id])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  // useEffect(() => {
  //   if (token === '') return;
  //   if (!token) {
  //     ToastAlerta('Você precisa estar logado!', 'info')
  //     handleLogout();
  //     navigate('/')
  //   }
  //   else {
  //     if (id !== undefined) {
  //       buscarPorId(id)
  //     }
  //     setLoadingPage(false);
  //   }
  // }, [token, id])


  async function deletarCargo() {
    setIsLoading(true)

    try {
      await deletar(`/cargo/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta("Cargo apagado com sucesso", "sucesso")

    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        ToastAlerta("Erro ao deletar o cargo.", "erro")
      }
    }

    setIsLoading(false)
    retornar()
  }

  function retornar() {
    navigate("/home")
  }

  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen w-full">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="80"
        visible={true}
      />
    </div>;
  }

  if (!usuario?.token) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative md:justify-between items-center md:items-start overflow-hidden">
      <img
        src={colbgleft}
        alt="decorativo"
        className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0"
      />

      <div className="flex items-center flex-col gap-4 p-4 py-8 md:py-4 w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl">
        <div className='my-2 flex flex-col gap-2 items-center text-center'>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-800">
            Removendo Cargo
          </h2>
          <p className='text-sm sm:text-base text-gray-600 max-w-md'>
            Você tem certeza que deseja remover o registro desse cargo?
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nome" className="w-full pl-3 text-sm font-normal">Nome do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="text"
                placeholder="..."
                name='nome'
                value={cargo.nome}
                disabled
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nivel" className="w-full pl-3 text-sm font-normal">Nivel do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="text"
                placeholder="..."
                name='nivel'
                value={cargo.nivel}
                disabled
              />
            </div>
            <div>
              <label htmlFor="salario" className="w-full pl-3 text-sm font-normal">Salario do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="number"
                placeholder="..."
                name='salario'
                value={cargo.salario}
                disabled
              />
            </div>
            <div>
              <label htmlFor="descricao" className="w-full pl-3 text-sm font-normal">Descrição do Cargo</label>
              <textarea
                name='descricao'
                placeholder="..."
                className="w-full resize-y rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200 min-h-[100px]"
                id=""
                value={cargo.descricao}
                disabled
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="departamento" className="w-full pl-3 text-sm font-normal">Departamento</label>
              <select
                required
                value={cargo.departamento?.id || ""}
                name="departamento"
                id="departamento"
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                disabled
              >
                <option value="" disabled>Selecione um departamento</option>
                {cargo.departamento && (
                  <option value={cargo.departamento.id}>
                    {cargo.departamento.nome}
                  </option>
                )}
              </select>

            </div>
            <div className='flex flex-col sm:flex-row gap-2 mt-6'>
              <button
                className="flex justify-center items-center w-full cursor-pointer rounded-sm border-none px-3 py-2 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-rh-primary-white bg-rh-secondary-red hover:bg-red-500"
                onClick={deletarCargo}>
                {isLoading ?
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                  <span>Remover</span>
                }
              </button>
              <Link to="/cargos" className="rounded text-slate-100 bg-gray-800 hover:bg-gray-900 w-full py-2 mx-auto flex justify-center text-center">Cancelar</Link>
            </div>
          </div>
        </div>
      </div>

      <img
        src={colbgright}
        alt="decorativo"
        className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0"
      />
    </div>
  )
}