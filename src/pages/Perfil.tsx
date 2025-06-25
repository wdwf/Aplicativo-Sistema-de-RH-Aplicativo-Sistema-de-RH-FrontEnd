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

},[])

  return (
  <div className="relative flex flex-col items-center min-h-screen">
    <img src={bgperfil} alt="Imagem de fundo do perfil"
    className="w-full h-48 md:h-64 object-cover object-center absolute top-0 left-0 z-0" 
    />
    <div className="absolute z-10 top-24 md:top-32 text-center flex flex-col items-center bg-white p-6 rounded-lg shadow-lg mx-4 w-11/12 max-w-sm sm:max-w-md lg:max-w-lg">
      <img src={usuario.foto} alt="foto do usuario" className="rounded-full border-4 md:border-8 border-white w-24 h-24 md:w-32 md:h-32 object-cover -mt-16 md:-mt-20 shadow-md "/>
      <p className="mt-6 mb-1 font-semibold text-2xl md:text-4xl">
        {usuario.nome}
      </p>
      <p className="mb-6 text-xl md:text-2xl text-gray-600">
        {usuarioPerfil.cargo?.nome}, {usuarioPerfil.cargo?.nivel}
      </p>
      <Link to="/editar-perfil" className="bg-rh-secondarypurple text-rh-primary-50 px-8 py-3 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium shadow-md">
      Editar Perfil
      </Link>
    </div>
  </div>  
  );
}
