import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgperfil from "../../assets/img/bgPerfil.png";
import { AuthContext } from "../../contexts/AuthContext";
import Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import noPicture from "../../assets/img/noPicture.png";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";


export default function Perfil() {

  const navigate = useNavigate();

  const { usuario, handleLogout, isAuthLoading } = useContext(AuthContext);

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
    window.scrollTo(0, 0);
    if (!isAuthLoading) {
      if (!usuario.token) {
        ToastAlerta('Você precisa estar logado!', 'info')
        navigate('/')
      } else {
        buscarUserPorId(String(usuario?.id))
      }
    }
  }, [isAuthLoading, usuario?.token])

  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen w-full">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="80"
        visible={true}
      />
    </div>;
  }

  if (!usuario?.token) {
    return null;
  }

  return (

    <div className="min-h-screen flex flex-col items-center justify-start relative overflow-hidden">
      <img src={bgperfil} alt="Imagem de fundo do perfil" className="w-full h-48 md:h-64 object-cover object-center absolute top-0 left-0 z-0" />
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-6 mx-4 mt-24 md:mt-32 w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col items-center">
        <img src={usuario?.foto.length > 10 ? usuario.foto : noPicture} alt="Foto de Perfil" className="rounded-full border-4 border-white w-32 h-32 md:w-40 md:h-40 object-cover -mt-20 md:-mt-24 shadow-md" />
        <p className="mt-4 mb-2 font-semibold text-2xl md:text-3xl text-gray-800">
          {usuario?.nome}
        </p>
        <div className="flex flex-col sm:flex-row justify-center w-full gap-4 mb-6">
          <div className="bg-[#f3f3f4] rounded-lg border border-gray-300 w-full sm:w-1/2 p-3 text-center">
            <p className="text-sm text-gray-600 mb-1">Cargo</p>
            <p className="text-md md:text-lg font-semibold">{usuarioPerfil.cargo?.nome}</p>
          </div>
          <div className="bg-[#f3f3f4] rounded-LG border border-gray-300 w-full sm:w-1/2 p-3 text-center">
            <p className="text-sm text-gray-600 mb-1">Nivel</p>
            <p className="text-md md:text-lg font-semibold">{usuarioPerfil.cargo?.nivel}</p>
          </div>
        </div>
        <Link to="/editar-perfil" className="bg-rh-secondarypurple text-rh-primary-50 px-8 py-3 rounded-full hover:bg-gray-800 transition-colors text-lg font-medium">
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}
