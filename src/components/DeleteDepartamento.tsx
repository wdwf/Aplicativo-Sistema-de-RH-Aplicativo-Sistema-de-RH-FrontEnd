/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Departamento from '../models/Departamento';
import { ToastAlerta } from '../utils/ToastAlerta';
import { buscar, deletar } from '../services/Service';
import { RotatingLines } from 'react-loader-spinner';

function DeleteDepartamento() {

const navigate = useNavigate();

const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)
const [isLoading, setIsLoading] = useState<boolean>(false)

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
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Departamento
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{departamento.descricao}</p>
                <div className="flex">

                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                                   hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarDepartamento}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>

                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                </div>
            </div>
        </div>
  )
}

export default DeleteDepartamento