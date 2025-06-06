/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Departamento from '../models/Departamento';
import { AuthContext } from '../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';
import { RotatingLines } from 'react-loader-spinner';

function FormDepartamento() {

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


    async function buscarPorDescricao(descricao: string) {
        try {
            await buscar(`/departamento/descricao/${descricao}`, setDepartamento, {
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


    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setDepartamento({
            ...departamento,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/departamento")
    }


     async function gerarNovoDepartamento(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/departamento`, departamento, setDepartamento, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Departamento foi atualizado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Departamento.', 'erro')
                }

            }
        } else {
            try {
                await cadastrar(`/departamento`, departamento, setDepartamento, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Departamento foi cadastrado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o Departamento.','erro')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }



    
  return (
    <>
    <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Departamento' : 'Editar Departamento'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoDepartamento}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Departamento</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu Departamento"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    </>
  )
}

export default FormDepartamento;