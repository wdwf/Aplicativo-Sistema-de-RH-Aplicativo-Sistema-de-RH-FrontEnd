import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgperfil from "../../assets/img/bgPerfil.png";
import { AuthContext } from "../../contexts/AuthContext";
import Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import noPicture from "../../assets/img/noPicture.png";


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

  useEffect(() => {
    buscarUserPorId(String(usuario.id))

  }, [])

  return (

    <div className="h-screen relative flex justify-center">
      <img src={bgperfil} alt="" className="cover max-h-[607px] h-fit" />
      <div className="absolute z-10 top-[100px] text-center flex flex-col items-center">
        <img src={usuario.foto.length > 10 ? usuario.foto : noPicture} alt="" className="rounded-full border-10 border-white max-w-[200px] " />
        <p className="mt-6 mb-2 font-semibold text-4xl">
          {usuario.nome}
        </p>
        <div className="flex justify-between gap-5 py-4">
          <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
            <p className="text-sm text-gray-600">Cargo</p>
            <p className="text-lg font-semibold">{usuarioPerfil.cargo?.nome}</p>
          </div>
          <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
            <p className="text-sm text-gray-600">Nivel</p>
            <p className="text-lg font-semibold">{usuarioPerfil.cargo?.nivel}</p>
          </div>
        </div>
        <Link to="/editar-perfil" className="bg-rh-secondarypurple text-rh-primary-50 px-10 py-2 rounded hover:bg-gray-800 transition-colors">
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}
