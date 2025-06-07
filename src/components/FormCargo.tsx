import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cargo from "../models/Cargo";
import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

export default function FormCargo() {
  const navigate = useNavigate();

  const [cargo, setCargo] = useState<Cargo>({} as Cargo)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCargo({
      ...cargo,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/home")
  }

  async function gerarNovoCargo(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/cargo`, cargo, setCargo, {
          headers: { 'Authorization': token }
        })
        ToastAlerta("O Cargo foi atualizado com sucesso!", "sucesso")
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o cargo.", "erro")
        }

      }
    } else {
      try {
        await cadastrar(`/cargo`, cargo, setCargo, {
          headers: { 'Authorization': token }
        })
        ToastAlerta("O Cargo foi cadastrado com sucesso!", "sucesso")
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o cargo.", "erro")
        }

      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div>
      <h2>
        {id === undefined ? 'Cadastrar Cargo' : 'Editar Cargo'}
      </h2>

      <form onSubmit={gerarNovoCargo}>
        <div>
          <div>
            <label htmlFor="nome">Nome do Cargo</label>
            <input
              type="text"
              placeholder="..."
              name='nome'
              value={cargo.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <label htmlFor="nivel">Nivel do Cargo</label>
            <input
              type="text"
              placeholder="..."
              name='nivel'
              value={cargo.nivel}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <label htmlFor="salario">Salario do Cargo</label>
            <input
              type="text"
              placeholder="..."
              name='salario'
              value={cargo.salario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div>
            <label htmlFor="descricao">Descrição do Cargo</label>
            <input
              type="text"
              placeholder="..."
              name='descricao'
              value={cargo.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
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
        </div>
      </form>
    </div>
  )
}
