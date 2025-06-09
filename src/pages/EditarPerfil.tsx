import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar, deletar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import bgeditar1 from "../assets/img/bgeditar1.png";
import bgeditar2 from "../assets/img/bgeditar2.png";
import ListaCargo from "../components/ListaCargo";
import Cargo from "../models/Cargo";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const { usuario, setUsuario, handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listaCargos, setListaCargos] = useState<Cargo[]>([]);
  const [usuarioEditar, setUsuarioEditar] = useState({
    id: "",
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    cargo: "",
  });

  useEffect(() => {
    if (usuario.token === "") {
      return;
    }
    if (!usuario.token) {
      ToastAlerta("Você precisa estar Logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      if (usuario.id) {
        buscarUserPorId(String(usuario.id));
      }
    }
  }, [usuario.token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    console.log(e);

    setUsuarioEditar({
      ...usuarioEditar,
      [e.target.name]: e.target.value,
    });
  }

  async function buscarUserPorId(id: string) {
    try {
      await buscar(
        `/usuario/${id}`,
        (data: any) => {
          const { id, nome, usuario, foto, cargo } = data;
          setUsuarioEditar({
            id,
            nome,
            usuario,
            senha: "", // sempre limpar a senha
            foto,
            cargo,
          });
        },
        {
          headers: {
            Authorization: usuario.token,
          },
        }
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarCargo() {
    try {
      await buscar('/cargo', setListaCargos, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      await atualizar("/usuario/atualizar", usuarioEditar, setUsuario, {
        headers: {
          Authorization: usuario.token,
        },
      });

      ToastAlerta("Dados atualizados com sucesso!", "sucesso");
      ToastAlerta("Por motivos de segurança o usuario foi deslogado", "info");
      handleLogout();
    } catch (error) {
      ToastAlerta("Erro ao atualizar dados. Verifique os campos.", "error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarUserPorId(String(usuario.id)).then(() => {
      setUsuarioEditar((prevData) => ({
        ...prevData,
        senha: "",
      }));
    });
  }, []);

  function atualizarCargo(event: ChangeEvent<HTMLSelectElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex min-h-screen relative justify-between">
      <img src={bgeditar1} alt="decorativo" className="sticky top-0 h-screen" />

      <div className="w-full max-w-md m-auto px-4">
        <h2 className="font-medium text-4xl mb-8 text-center">Seus Dados</h2>

        <form className="flex flex-col gap-6">
          <div className="mb-2">
            <label className="block text-text mb-1" htmlFor="nome">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Digite seu nome completo"
              className="w-full px-4 py-2 text-rh-secondarygrey border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="mb-2">
            <label className="block text-text mb-1" htmlFor="usuario">
              Email
            </label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              placeholder="Exemplo@email.com"
              className="w-full px-4 py-2 text-rh-secondarygrey border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="mb-2">
            <label className="block text-text mb-1" htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Minimo 8 caracteres"
              className="w-full px-4 py-2 text-rh-secondarygrey border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="mb-2">
            <label className="block text-text mb-1" htmlFor="foto">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Coloque o link da foto aqui"
              className="w-full px-4 py-2 text-rh-secondarygrey border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={usuarioEditar.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>

          <div className="mb-2">
            <label className="block text-text mb-1" htmlFor="cargo">
              Cargo
            </label>
            <select
              required
              value={usuarioEditar.cargo?.id || ""}
              name="cargo"
              id="cargo"
              className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
              onChange={atualizarCargo}
            >
              <option value="" disabled>
                Selecione um cargo
              </option>
              {listaCargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center gap-6">
            <button
              type="submit"
              className="bg-rh-primaryblue text-rh-primary-50 px-10 py-2 rounded hover:bg-rh-secondaryblue transition-colors"
            >
              Atualizar
            </button>

            <button
              type="button"
              className="bg-rh-primarygrey text-rh-primary-50 px-10 py-2 rounded hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/perfil")} // ou use a função desejada
            >
              Cancelar
            </button>
          </div>

          {/* <button onClick={handleSubmit}>
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Atualizar</span>
            )}
          </button> */}

          {/* <button
                className="flex justify-center items-center w-full cursor-pointer rounded-sm border-none px-3 py-2 font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-rh-primary-white bg-rh-secondary-red hover:bg-red-500"
                onClick={deletar}>
                {isLoading ?
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  /> :
                  <span>Remover</span>
                }
              </button> */}
        </form>
      </div>

      <img src={bgeditar2} alt="decorativo" className="sticky top-0 h-screen" />
    </div>
  );
}
