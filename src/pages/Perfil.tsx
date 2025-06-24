import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastAlerta } from "../utils/ToastAlerta";
import { buscar } from "../services/Service";
import bgperfil from "../assets/img/bgPerfil.png";
import Usuario from "../models/Usuario";

export default function Perfil() {
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  const [usuarioPerfil, setUsuarioPerfil] = useState<Usuario>({
    id: Number(""),
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    cargo: null,
  });

  async function buscarUserPorId(id: string) {
    try {
      await buscar(
        `/usuario/${id}`,
        (data: any) => {
          const { id, nome, usuario, foto, cargo } = data;
          setUsuarioPerfil({
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
            Authorization: usuario?.token,
          },
        }
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarUserPorId(String(usuario?.id))

  }, [])

  return (
    <div className="relative flex justify-center">
      <img src={bgperfil} alt="" />
      <div className="absolute z-10 top-40 text-center flex flex-col items-center">
        <img src={usuario?.foto} alt="" className="rounded-full border-10 border-white max-w-[200px] " />
        <p className="mt-10 mb-2 font-semibold text-4xl">
          {usuario?.nome}
        </p>
        <p className="mb-10 text-3xl ">
          {usuarioPerfil.cargo?.nome}, {usuarioPerfil.cargo?.nivel}
        </p>
        <Link to="/editar-perfil" className="bg-rh-secondarypurple text-rh-primary-50 px-10 py-2 rounded hover:bg-gray-800 transition-colors">
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}
