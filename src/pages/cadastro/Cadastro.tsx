import { useNavigate } from 'react-router-dom'
import './Cadastro.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {

    const navigate = useNavigate()

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
      [e.target.name]: e.target.value
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
          tipo: usuario.tipo,
          cargo: usuario.cargo,
          departamento: usuario.departamento,
        }, setUsuario)
        ToastAlerts("Usuário cadastrado com sucesso!", "sucesso")
        } catch (error) {
        ToastAlerts("Erro ao cadastrar o usuário!", "erro")
      }
    } else {
      ToastAlerts("Dados do usuário inconsistentes! Verifique as informações do cadastro.", "erro")
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
            <label htmlFor="tipo" className="mb-1">Tipo de Usuário</label>
            <input
              type="text"
              id="tipo"
              name="tipo"
              placeholder="Ex: Administrador, RH..."
              className="p-2 rounded bg-white text-black"
              value={usuario.tipo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cargo" className="mb-1">cargo</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              placeholder="Ex: Administrador, RH..."
              className="p-2 rounded bg-white text-black"
              value={usuario.cargo}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="departamento" className="mb-1">departamento</label>
            <input
              type="text"
              id="departamento"
              name="departamento"
              placeholder="Ex: Financeiro, RH..."
              className="p-2 rounded bg-white text-black"
              value={usuario.departamento}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <button 
              type="reset"
              className="bg-red-500 hover:bg-red-700 text-white py-2 w-1/2 rounded"
            >
              Cancelar
            </button>
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

function ToastAlerts(arg0: string, arg1: string) {
    throw new Error('Function not implemented.')
}
