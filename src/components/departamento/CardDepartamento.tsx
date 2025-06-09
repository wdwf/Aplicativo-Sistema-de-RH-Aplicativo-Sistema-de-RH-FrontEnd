import { Link } from "react-router-dom";
import LogoDepartamento from "../../assets/img/LogoDepartamento.png";
import Departamento from "../../models/Departamento";

interface CardDepartamentoProps {
  departamento: Departamento;
}

function CardDepartamento({ departamento }: CardDepartamentoProps) {

  return (
    <div className="min-w-[420px] p-6 border flex flex-col flex-1 gap-4 rounded-2xl shadow-gray-400 shadow-lg overflow-hidden hover:shadow-rh-primarygrey transform hover:-translate-y-2 transition-all duration-300 justify-between bg-rh-primary-white">
      <header className="flex bg-white text-black font-semibold items-center">
        <span className="flex items-center justify-center h-[45px] w-[45px] border rounded">
          <img
            className="h-[24px] w-[24px]"
            src={LogoDepartamento}
            alt="Logo do Cargo"
          />
        </span>
        <div className="flex flex-col ml-5">
          <h3 className="font-light text-[15px]">Departamento</h3>
          <h3 className="text-rh-primarygrey text-2xl">
            {departamento.nome}
          </h3>
        </div>
      </header>

      <div className="flex justify-between gap-5">
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Andar</p>
          <p className="text-lg font-semibold">{departamento.andar}</p>
        </div>
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Ramal</p>
          <p className="text-lg font-semibold">{departamento.ramal}</p>
        </div>
      </div>

      <div className="bg-[#f3f3f4] rounded border border-gray-300 p-2">
        <p className="text-sm text-gray-500">Descrição:</p>
        <p className="text-sm line-clamp-2 h-[50px] overflow-y-scroll">{departamento.descricao}</p>
      </div>

      <div className="flex w-full gap-3 ">
        <Link
          to={`/editar-departamento/${departamento.id}`}
          className="w-full text-slate-100 bg-rh-primarygrey transition-colors duration-500
          rounded hover:bg-rh-secondaryblue py-2 flex items-center justify-center"
        >
          Editar
        </Link>

        <Link
          to={`/deletar-departamento/${departamento.id}`}
          className="text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 w-full p-2		          
          rounded flex items-center justify-center"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardDepartamento;
