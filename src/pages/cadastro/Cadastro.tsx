import { useNavigate, useParams } from 'react-router-dom'
import './Cadastro.css'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { buscar, cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'
import { RotatingLines } from 'react-loader-spinner'

import { AuthContext } from '../../contexts/AuthContext'
import { ToastAlerta } from '../../utils/ToastAlerta'

function Cadastro() {

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>();
  
const { usuario: usuarioContext, handleLogout } = useContext(AuthContext)
const token = usuarioContext.token
    

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({} as Usuario)

  useEffect(() => {
    if (usuario.id !== undefined) {
      retornar()
    }
  }, [usuario])

  function retornar() {
    navigate('/login')
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

      setIsLoading(true)
      console.log(usuario);

      try {
        await cadastrarUsuario(`/usuario/cadastrar`, {
          nome: usuario.nome,
          usuario: usuario.usuario,
          senha: usuario.senha,
          foto: usuario.foto
        }, setUsuario)
        ToastAlerta("Usuário cadastrado com sucesso!", "sucesso")
        } catch (error) {
        ToastAlerta("Erro ao cadastrar o usuário!", "erro")
      }
    } else {
      ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.", "erro")
      setUsuario({ ...usuario, senha: '' })
      setConfirmaSenha('')
    }

      setIsLoading(false)
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen bg-[#fdfdf8] font-sans">
      

      <div className="flex justify-center items-center">
        <h1 className="text-6xl font-bold text-slate-800">rhcorp</h1>
      </div>

      <div className="flex justify-center items-center">
        <form onSubmit={cadastrarNovoUsuario} className="bg-[#0b1f38] text-white rounded-lg shadow-lg p-10 w-[90%] max-w-md space-y-4">

          <h2 className="text-2xl font-semibold text-[#00e092] mb-6 text-center">
            Cadastro de Usuário
          </h2>

          <div className="flex flex-col">
            <label htmlFor="nome" className="mb-1">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome"
              className="p-2 rounded bg-white text-black"
              value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="usuario" className="mb-1">E-mail</label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Digite seu e-mail"
              className="p-2 rounded bg-white text-black"
              value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="foto" className="mb-1">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Cole o Link da sua Imagem"
              className="p-2 rounded bg-white text-black"
              value={usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="senha" className="mb-1">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              className="p-2 rounded bg-white text-black"
              value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmarSenha" className="mb-1">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Digite novamente sua senha"
              className="p-2 rounded bg-white text-black"
              value={confirmaSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>handleConfirmarSenha(e)}
            />
          </div>


          <div className="flex justify-between gap-4 pt-4">
            <button 
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white py-2 w-1/2 rounded"
              disabled={isLoading}
            >
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Cadastro
