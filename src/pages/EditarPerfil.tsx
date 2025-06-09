import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router";



import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

export default function EditarPerfil() {



  const navigate = useNavigate();
  const { usuario, setUsuario, handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false)
  const [usuarioEditar, setUsuarioEditar] = useState({
          id: "",
          nome: "",
          usuario: "",
          senha: "",
          foto: ""})

          useEffect(() => {
    if(usuario.token === ''){
             return
         }
         if(!usuario.token){
         ToastAlerta("Você precisa estar Logado!","info")
         handleLogout();
         navigate("/")
         }
         else{
         if (usuario.id){
          buscarUserPorId(String(usuario.id))
         }        
         }
  }, [usuario.token])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);
    
        setUsuarioEditar({
            ...usuarioEditar,
            [e.target.name]: e.target.value
        })
    }

   async function buscarUserPorId(id: string) {
    try {
      await buscar(`/usuario/${id}`, (data: any) => {
        const { id, nome, usuario, foto } = data
        setUsuarioEditar({
          id,
          nome,
          usuario,
          senha: "", // sempre limpar a senha
          foto
        })
      }, {
        headers: {
          'Authorization': usuario.token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  async function handleSubmit() {
    setIsLoading(true)
    try {
      await atualizar("/usuario/atualizar", usuarioEditar, setUsuario, {
        headers: {
          Authorization: usuario.token
        }
      })

      ToastAlerta("Dados atualizados com sucesso!", "sucesso")
      ToastAlerta("Por motivos de segurança o usuario foi deslogado", "info")
      handleLogout()
    } catch (error) {
      ToastAlerta("Erro ao atualizar dados. Verifique os campos.", "error")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    buscarUserPorId(String(usuario.id)).then(() => {
      setUsuarioEditar((prevData) => ({
        ...prevData,
        senha: ""
      }))
    })
  }, [])

  return (
    <div className="min-h-screen w-full text-text">
      <div className="max-w-[600px] m-auto pt-10">
        <h2 className="font-medium text-4xl mb-8">Seus Dados</h2>

        <form className="flex flex-col gap-6" >
          
          <div className="mb-4">
            <label className="block text-text mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Jorginho das 12!"
              className="w-full px-4 py-2 text-text-secundary border-4 border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-text mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="********"
              className="w-full px-4 py-2 text-text-secundary border-4 border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-text mb-1" htmlFor="usuario">
              Email
            </label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Exemplo@email.com"
              className="w-full px-4 py-2 text-text-secundary border-4 border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-text mb-1" htmlFor="foto">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="coloque o link da foto aqui:"
              className="w-full px-4 py-2 text-text-secundary border-4 border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <button onClick={handleSubmit}>
            {isLoading ?
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
              <span>Atualizar</span>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
