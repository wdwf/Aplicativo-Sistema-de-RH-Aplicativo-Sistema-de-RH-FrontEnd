/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Departamento from '../models/Departamento';
import { ToastAlerta } from '../utils/ToastAlerta';
import { buscar, deletar } from '../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import DeletarCargo from './DeletarCargo';
import LogoDepartamento from "../assets/img/LogoDepartamento.png";


function DeleteDepartamento() {

const navigate = useNavigate();

const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)
const [isLoading, setIsLoading] = useState<boolean>(false)

const [showModal, setShowModal] = useState(false);


const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token

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
        navigate("/departamento")
    }



  return (

    
    <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Departamento</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o departamento a seguir?</p>
            <div className="border flex flex-col rounded-2xl shadow-gray-400 shadow-lg overflow-hidden hover:shadow-rh-primarygrey transform hover:-translate-y-2 transition-all duration-300 justify-between">
      <header className="flex py-4 px-6 bg-white text-black font-semibold ">
        <img
          className="h-[35px] w-[36px]"
          src={LogoDepartamento}
          alt="Logo do Departamento"
        />
        <div className="flex flex-col">
          <h3 className="ml-5 font-light text-[15px]">Departamento</h3>
          <h3 className="ml-5 text-rh-primaryblue text-2xl">
            {departamento.nome}
          </h3>
        </div>
      </header>

      <div className="flex justify-between gap-5 px-6">
        <div className="bg-[#FDFFFB] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Andar</p>
          <p className="text-lg font-semibold">{departamento.andar}</p>
        </div>
        <div className="bg-[#FDFFFB] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Ramal</p>
          <p className="text-lg font-semibold">{departamento.ramal}</p>
        </div>
      </div>

      <div className="flex justify-between gap-5 py-6">
          <div className="px-6">
            <p className="text-sm text-gray-600 ">Descrição: </p>
            <p className="text-lg line-clamp-2 h-[50px]">{departamento.descricao}</p>
          </div>
        </div>

      <div className="flex justify-center gap-15 h-[80px] pb-5 ">

        <button
          onClick={deletarDepartamento}
          className="text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 w-1/3 p-2		          
                     rounded flex items-center justify-center"
        >
          Sim
        </button>

        <button
          onClick={retornar}
          className=" text-slate-100 bg-rh-primarygrey transition-colors duration-500
            rounded hover:bg-rh-secondaryblue w-1/3 py-2 flex items-center justify-center"
        > Cancelar
        </button>
      </div>
    </div>
    </div>
  )
}

export default DeleteDepartamento