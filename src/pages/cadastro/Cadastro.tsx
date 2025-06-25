import { Link, useNavigate } from 'react-router-dom'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { cadastrarUsuario } from '../../services/Service'
import Usuario from '../../models/Usuario'
import { RotatingLines } from 'react-loader-spinner'

import { ToastAlerta } from '../../utils/ToastAlerta'
import Bg from "../../assets/img/Bg.png"
import Bg2 from "../../assets/img/Bg2.png"
import Logo from "../../assets/img/Logo.png"

function Cadastro() {

  const navigate = useNavigate()


  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({} as Usuario)

  useEffect(() => {
    if (usuario?.id !== undefined) {
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

    if (confirmaSenha === usuario?.senha && usuario?.senha.length >= 8) {

      setIsLoading(true)
      console.log(usuario);

      try {
        await cadastrarUsuario(`/usuario/cadastrar`, {
          nome: usuario?.nome,
          usuario: usuario?.usuario,
          senha: usuario?.senha,
          foto: usuario?.foto
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

    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative items-end justify-center px-1 overflow-hidden group">
        <img
          src={Bg}
          alt="Imagem normal"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
        />
        <img
          src={Bg2}
          alt="Imagem hover"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className=" w-full lg:w-1/2 bg-white flex flex-col justify-center items-center py-8 px-4 md:py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col mb-4 items-center">
            <img src={Logo} alt="Logo Rh Corp" className="h-12 md:h-16 mb-2" />
          </div>

          <h1 className="text-rh-primarygrey  text-3xl md:text-4xl text-center mb-2 ">Cadastre-se</h1>
          <p className="text-rh-secondarygrey text-sm md:text-xs text-center mb-6">Gerenciando sabiamente o bem mais valioso de uma empresa.</p>


          <form onSubmit={cadastrarNovoUsuario} className="space-y-4">

            <div>
              <label className="block text-text mb-1" htmlFor="usuario">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                value={usuario.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div>
              <label htmlFor="usuario" className="block text-text mb-1">E-mail</label>
              <input
                type="email"
                id="usuario"
                name="usuario"
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                value={usuario.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="foto" className=" block text-text mb-1">Foto</label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder="Cole o Link da sua Imagem"
                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                value={usuario.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-text mb-1">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                value={usuario.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-text mb-1">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Digite novamente sua senha"
                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                value={confirmaSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rh-primarygrey text-white font-semibold hover:bg-rh-secondaryblue py-2 rounded transition cursor-pointer flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }
            </button>

            <p className="text-center text-text-tertiary mt-6">
              Já tem conta?{" "}
              <Link to="/login" className="text-black font-semibold hover:underline inline-flex items-center gap-1">
                Entrar <span>→</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Cadastro;
