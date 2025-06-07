/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Departamento from '../models/Departamento';
import { AuthContext } from '../contexts/AuthContext';
import { atualizar, buscar, cadastrar } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';
import { RotatingLines } from 'react-loader-spinner';

function FormDepartamento() {

    const navigate = useNavigate();

    const [departamento, setDepartamento] = useState<Departamento>({} as Departamento)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [loadingPage, setLoadingPage] = useState(true);

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    

    const { id } = useParams<{ id: string }>();


    
       useEffect (() => {
        if(token === ''){
            return
        }
        if(!token){
        ToastAlerta("Você precisa estar Logado!","info")
        handleLogout();
        navigate("/")
        }else{
            buscar(`/departamento/${id}`, setDepartamento, {
             headers: { Authorization: token },
           });
           setLoadingPage(false)
        }
       }, [token])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setDepartamento({
            ...departamento,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/home")
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
                    ToastAlerta('Erro ao cadastrar o Departamento.', 'erro')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

if (loadingPage) {
    return <RotatingLines
      strokeColor="black"
      strokeWidth="5"
      animationDuration="0.75"
      width="24"
      visible={true}
    />
  }

  console.log(departamento);
  

    
  return (
    <>
    <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Departamento' : 'Editar Departamento'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoDepartamento}>
                <div className="flex flex-col gap-2">
                    
                    <label htmlFor="nome">Nome do Departamento</label>
                    <input
                        type="text"
                        placeholder="Escreva aqui o nome de seu Departamento"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />

                    <label htmlFor="descricao">Descrição do Departamento</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu Departamento"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="andar">Andar</label>
                    <input
                        type="text"
                        placeholder="Ex... 1º Andar"
                        name='andar'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.andar}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="ramal">Ramal</label>
                    <input
                        type="text"
                        placeholder="Por Ex: 123"
                        name='ramal'
                        className="border-2 border-slate-700 rounded p-2"
                        value={departamento.ramal}
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
                <Link to="/home">Cancelar</Link>
            </form>
        </div>
    </>
  )
}

export default FormDepartamento;