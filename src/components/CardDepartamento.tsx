import React from "react";
import { Link } from "react-router-dom";
import Departamento from "../models/Departamento";
import LogoDepartamento from "../assets/img/LogoDepartamento.png";

interface CardDepartamentoProps {
  departamento: Departamento;
}

function CardDepartamento({ departamento }: CardDepartamentoProps) {
  return (
    <div className="border flex flex-col rounded-2xl shadow-gray-400 shadow-lg overflow-hidden hover:shadow-rh-primarygrey transform hover:-translate-y-2 transition-all duration-300 justify-between">
      <header className="flex py-4 px-6 bg-white text-black font-semibold ">
        <img
          className="h-[35px] w-[36px]"
          src={LogoDepartamento}
          alt="Logo do Departamento"
        />
        <div className="flex flex-col">
          <h3 className="ml-5 font-light text-[15px]">Departamento</h3>
          <h3 className="ml-5 text-rh-primaryblue text-2xl">
            {departamento.nome}
          </h3>
        </div>
      </header>

      <div className="flex justify-between gap-5 px-6">
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Andar</p>
          <p className="text-lg font-semibold">{departamento.andar}</p>
        </div>
        <div className="bg-[#f3f3f4] rounded border border-gray-300 w-1/2 p-2">
          <p className="text-sm text-gray-600">Ramal</p>
          <p className="text-lg font-semibold">{departamento.ramal}</p>
        </div>
      </div>

      <div className="flex justify-between gap-5 py-6">
          <div className="px-6">
            <p className="text-sm text-gray-600 ">Descrição: </p>
            <p className="text-lg line-clamp-2 h-[50px]">{departamento.descricao}</p>
          </div>
        </div>

      <div className="flex justify-center gap-15 h-[80px] pb-5 ">
        <Link
          to={`/editardepartamento/${departamento.id}`}
          className=" text-slate-100 bg-rh-primarygrey transition-colors duration-500
            rounded hover:bg-rh-secondaryblue w-1/3 py-2 flex items-center justify-center"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletardepartamento/${departamento.id}`}
          className="text-slate-100 bg-red-400 transition-colors duration-500 hover:bg-red-700 w-1/3 p-2		          
                     rounded flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardDepartamento;
