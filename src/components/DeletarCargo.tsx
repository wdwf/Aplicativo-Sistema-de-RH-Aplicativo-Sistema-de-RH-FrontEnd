import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { buscar, deletar } from '../services/Service';
import Cargo from '../models/Cargo';
import { AuthContext } from '../contexts/AuthContext';
import { ToastAlerta } from '../utils/ToastAlerta';
import { RotatingLines } from 'react-loader-spinner';

export default function DeletarCargo() {
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

  return (
    <div>
      <h2>
        Deletar Cargo
      </h2>
      <p>Você tem certeza de que deseja apagar o registro a seguir?</p>
      <ul>
        <li>{cargo.nome}</li>
        <li>{cargo.nivel}</li>
        <li>{cargo.salario}</li>
        <li>{cargo.descricao}</li>
      </ul>
      <div className="flex">
        <button
          onClick={deletarCargo}>
          {isLoading ?
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            /> :
            <span>remover</span>
          }
        </button>
        <button
          onClick={retornar}>
          cancelar
        </button>
      </div>
    </div>
  )
}
