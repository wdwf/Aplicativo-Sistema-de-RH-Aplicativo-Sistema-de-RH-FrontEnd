import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buscar, deletar } from '../services/Service';
import Cargo from '../models/Cargo';
import { AuthContext } from '../contexts/AuthContext';
import { ToastAlerta } from '../utils/ToastAlerta';
import { Hourglass, RotatingLines } from 'react-loader-spinner';
import colbgleft from "../assets/img/colbgleft.png";
import colbgright from "../assets/img/colbgright.png";

export default function DeletarCargo() {
  const navigate = useNavigate();

  const [cargo, setCargo] = useState<Cargo>({} as Cargo)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingPage, setLoadingPage] = useState(true);


  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

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
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  useEffect(() => {
    if (token === '') return;
    if (!token) {
      ToastAlerta('Você precisa estar logado!', 'info')
      handleLogout();
      navigate('/')
    }
    else {
      if (id !== undefined) {
        buscarPorId(id)
      }
      setLoadingPage(false);
    }
  }, [token, id])


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
    <div className="flex min-h-screen relative justify-between">
      <img src={colbgleft} alt="decorativo" className="sticky top-0 h-screen" />

      <div className="flex items-center flex-col gap-4 p-4">
        <h2 className="text-5xl font-medium text-gray-800 my-2">
          Removendo Cargo
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nome" className="w-full pl-3 text-sm font-normal">Nome do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
                className="w-full resize-none rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
            <div className='flex gap-2 mt-6'>
              <button
                className="flex justify-center items-center w-full cursor-pointer rounded-sm border-none px-3 py-2 font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-rh-primary-white bg-rh-secondary-red hover:bg-red-500"
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
              <Link to="/cargos" className="rounded text-slate-100 bg-gray-800 hover:bg-gray-900 w-full py-2 mx-auto flex justify-center">Cancelar</Link>
            </div>
          </div>
        </div>
      </div>

      <img src={colbgright} alt="decorativo" className="sticky top-0 h-screen" />
    </div>
  )
}
