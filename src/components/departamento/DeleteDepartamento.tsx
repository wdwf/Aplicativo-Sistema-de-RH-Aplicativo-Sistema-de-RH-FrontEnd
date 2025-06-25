import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Departamento from '../../models/Departamento';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { buscar, deletar } from '../../services/Service';
import LogoDepartamento from "../../assets/img/LogoDepartamento.png";
import { Hourglass } from 'react-loader-spinner';
import ColunaEsquerda from "../../assets/img/ColunaEsquerda.png";
import ColunaDireita from "../../assets/img/ColunaDireita.png";


function DeleteDepartamento() {

  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [showModal, setShowModal] = useState(false);


  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario?.token

  const { id } = useParams<{ id: string }>();
  const { descricao } = useParams<{ descricao: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/departamento/${id}`, setDepartamento, {
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
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])


  async function deletarDepartamento() {
    setIsLoading(true)

    try {
      await deletar(`/departamento/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Departamento apagado com sucesso', 'sucesso')

    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        ToastAlerta('Erro ao deletar o departamento.', 'erro')
      }
    }

    setIsLoading(false)
    retornar()
  }


  function retornar() {
    navigate("/departamentos")
  }

  if (isLoading) {
    return (
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
    <>
    <div className="flex flex-col md:flex-row min-h-screen relative md:justify-between items-center md:items-start overflow-hidden"> 


        <img
          className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0"
          src={ColunaEsquerda}
          alt="Coluna Esquerda"
        />

        <div className="flex items-center flex-col gap-4 p-4 py-8 md:py-4 w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl"> 
        <div className='my-2 flex flex-col gap-2 items-center text-center'> 
          <h1 className='text-2xl sm:text-3xl md:text-4xl text-center my-4 sm:my-6'>Deletar Departamento</h1>
          <p className='text-base sm:text-lg text-center font-semibold mb-4 sm:mb-6'>
            Você tem certeza de que deseja apagar o departamento a seguir?</p>

          <div className="border flex flex-col rounded-2xl shadow-md sm:shadow-lg overflow-hidden 
                          hover:shadow-rh-primarygrey transform hover:-translate-y-1 sm:hover:-translate-y-2 
                          transition-all duration-300 justify-between bg-white">
            <header className="flex py-4 px-4 sm:px-6 bg-white text-black font-semibold items-center gap-3 sm:gap-4">
              <img
                className="h-9 w-9 sm:h-12 sm:w-12 flex-shrink-0"
                src={LogoDepartamento}
                alt="Logo do Departamento"
              />
              <div className="flex flex-col ml-3 sm:ml-5 overflow-hidden">
                <h3 className="font-light text-xs sm:text-sm text-gray-600">Departamento</h3>
                <h3 className="text-rh-primaryblue text-xl sm:text-2xl md:text-3xl truncate">
                  {departamento.nome}
                </h3>
              </div>
            </header>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 px-4 sm:px-6 mb-4 sm:mb-6">
              <div className="bg-[#f3f3f4] rounded border border-gray-300 w-full sm:w-1/2 p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-gray-600">Andar</p>
                <p className="text-base sm:text-lg font-semibold">{departamento.andar}</p>
              </div>
              <div className="bg-[#f3f3f4] rounded border border-gray-300 w-full sm:w-1/2 p-2 sm:p-3">
                <p className="text-xs sm:text-sm text-gray-600">Ramal</p>
                <p className="text-base sm:text-lg font-semibold">{departamento.ramal}</p>
              </div>
            </div>

            <div className="bg-[#f3f3f4] rounded border border-gray-300 p-2 sm:p-3 mx-4 sm:mx-6 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-gray-500">Descrição: </p>
              <p className="text-sm sm:text-base line-clamp-2 min-h-[40px] max-h-[60px] overflow-y-auto">{departamento.descricao}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 px-4 sm:px-6 pb-4 sm:pb-6">
              <button
                onClick={deletarDepartamento}
                disabled={isLoading}
                className="w-full sm:w-1/2 text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 
                           py-2 rounded flex items-center justify-center text-base sm:text-lg
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Hourglass
                    visible={true}
                    height="20"
                    width="20"
                    ariaLabel="hourglass-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    colors={['#ffffff', '#f1f1f1']}
                  />
                ) : 'Sim'}
              </button>

              <button
                onClick={retornar}
                disabled={isLoading}
                className="w-full sm:w-1/2 text-slate-100 bg-rh-primarygrey transition-colors duration-500
                           rounded hover:bg-rh-secondaryblue py-2 flex items-center justify-center text-base sm:text-lg
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        </div>
        <img
          className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0"
          src={ColunaDireita}
          alt="Coluna Direita"
        />
      </div>
    </>
  );
}

export default DeleteDepartamento