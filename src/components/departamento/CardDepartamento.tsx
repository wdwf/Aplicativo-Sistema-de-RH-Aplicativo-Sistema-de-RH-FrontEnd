import { Link } from "react-router-dom";
import LogoDepartamento from "../../assets/img/LogoDepartamento.png";
import Departamento from "../../models/Departamento";

interface CardDepartamentoProps {
  departamento: Departamento;
}

function CardDepartamento({ departamento }: CardDepartamentoProps) {

  return (
    <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-md 
                p-4 sm:p-6 border flex flex-col flex-grow gap-3 sm:gap-4 rounded-2xl 
                shadow-md sm:shadow-lg hover:shadow-rh-primarygrey transform hover:-translate-y-1 sm:hover:-translate-y-2 
                transition-all duration-300 justify-between bg-rh-primary-white overflow-hidden">
      <header className="flex bg-white text-black font-semibold items-center">
        
        <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 border rounded flex-shrink-0">
          <img
            className="h-6 w-6 sm:h-8 sm:w-8"
            src={LogoDepartamento}
            alt="Logo do Departamento"
          />
        </span>
        
        <div className="flex flex-col ml-3 sm:ml-5 overflow-hidden">
          <h3 className="font-light text-xs sm:text-sm text-gray-600">Departamento</h3>
          <h3 className="text-rh-primarygrey text-xl sm:text-2xl lg:text-3xl truncate">
            {departamento.nome}
          </h3>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5">
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-full sm:w-1/2 p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-gray-600">Andar</p>
          <p className="text-base sm:text-lg font-semibold">{departamento.andar}</p>
        </div>
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-full sm:w-1/2 p-2 sm:p-3">
          <p className="text-xs sm:text-sm text-gray-600">Ramal</p>
          <p className="text-base sm:text-lg font-semibold">{departamento.ramal}</p>
        </div>
      </div>

      <div className="bg-[#f3f3f4] rounded border border-gray-300 p-2 sm:p-3">
        <p className="text-xs sm:text-sm text-gray-500">Descrição:</p>
        <p className="text-sm sm:text-base line-clamp-2 min-h-[40px] max-h-[60px] overflow-y-auto">{departamento.descricao}</p>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-3">
        <Link
          to={`/editar-departamento/${departamento.id}`}
          className="w-full text-slate-100 bg-rh-primarygrey transition-colors duration-500
                     rounded hover:bg-rh-secondaryblue py-2 flex items-center justify-center text-sm sm:text-base"
        >
          Editar
        </Link>

        <Link
          to={`/deletar-departamento/${departamento.id}`}
          className="text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 w-full p-2
                     rounded flex items-center justify-center text-sm sm:text-base"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardDepartamento;