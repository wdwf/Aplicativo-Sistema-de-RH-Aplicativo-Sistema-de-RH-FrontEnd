import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ToastAlerta } from "../utils/ToastAlerta";

export default function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <section className="max-w-4xl mx-auto mt-10 text-center">
        <h1 className="text-rh-primarygrey text-4xl font-bold mb-2">
          Olá, {usuario.nome} 👋
        </h1>
        <p className="text-rh-primarygrey text-2xl">
          Estamos Felizes por ter você conosco!!
        </p>
      </section>

      <div className="shadow-lg p-6 w-full max-w-4xl mx-auto mt-16 flex items-end gap-6 bg-rh-primary  px-6 py-4 border border-rh-secondarygrey rounded-md cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white">
        <div
          className="flex items-center gap-6 flex-grow py-8
        px-7"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="w-auto h-40 rounded-full border-rh-secondarygrey border-1"
            alt="foto perfil"
          />
        </div>
        <div className="md:w-1/2 p-8 text-rh-primarygrey flex flex-col justify-center mb-3">
          <div>
            <p className="font-semibold">Nome:</p>
            <p className="text-rh-primarygrey">{usuario.nome}</p>
          </div>

          <div>
            <p className="font-semibold">E-mail:</p>
            <p className="text-rh-primarygrey mb-5">{usuario.usuario}</p>
          </div>

          <button
            className="w-full bg-rh-primarygrey text-white font-
            semibold hover:bg-rh-secondaryblue py-2 rounded transition cursor-pointer"
          >
            <span>Editar Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
