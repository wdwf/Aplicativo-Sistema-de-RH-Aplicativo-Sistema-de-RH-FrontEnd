import { Link } from "react-router-dom";
import LogoCargo from "../../assets/img/LogoCargo.png";
import Cargo from "../../models/Cargo";


interface CardCargoProps {
  cargo: Cargo;
}

export default function CardCargo({ cargo }: CardCargoProps) {

  return (
    <div className="min-w-[420px] p-6 border flex flex-col flex-1 gap-4 rounded-2xl shadow-gray-400 shadow-lg overflow-hidden hover:shadow-rh-primarygrey transform hover:-translate-y-2 transition-all duration-300 justify-between bg-rh-primary-white">
      <header className="flex bg-white text-black font-semibold items-center">
        <span className="flex items-center justify-center h-[45px] w-[45px] border rounded">
          <img
            className="h-[24px] w-[24px]"
            src={LogoCargo}
            alt="Logo do Cargo"
          />
        </span>
        <div className="flex flex-col ml-5">
          <h3 className="font-light text-[15px]">Cargo</h3>
          <h3 className="text-rh-primarygrey text-2xl">
            {cargo.nome}
          </h3>
        </div>
      </header>
      <div className="flex justify-between gap-5">
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Nivel</p>
          <p className="text-lg font-semibold">{cargo.nivel}</p>
        </div>
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">salario bruto</p>
          <p className="text-lg font-semibold">{cargo.salario.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>

      <div className="bg-[#f3f3f4] rounded border border-gray-300 p-2">
        <p className="text-sm text-gray-500">Descrição:</p>
        <p className="text-sm line-clamp-2 h-[50px] overflow-y-scroll">{cargo.descricao}</p>
      </div>
      <hr className="text-gray-400" />
      <div className="flex justify-between gap-5">
        <div>
          <p className="text-sm text-gray-600">Valor hora</p>
          <p className="text-lg font-semibold">
            {(Number(cargo.salario) / 220).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}/hr
          </p>
        </div>
        <div className="flex w-full gap-3 ">
          <Link
            to={`/editar-cargo/${cargo.id}`}
            className="w-full text-slate-100 bg-rh-primarygrey transition-colors duration-500
          rounded hover:bg-rh-secondaryblue py-2 flex items-center justify-center"
          >
            Editar
          </Link>

          <Link
            to={`/deletar-cargo/${cargo.id}`}
            className="text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 w-full p-2		          
          rounded flex items-center justify-center"
          >
            Deletar
          </Link>
        </div>
      </div>
    </div>
  )
}
