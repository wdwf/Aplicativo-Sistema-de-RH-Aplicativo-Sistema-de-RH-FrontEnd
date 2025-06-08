import { Link } from "react-router-dom";
import Cargo from "../models/Cargo"

interface CardCargoProps {
  cargo: Cargo;
}

export default function CardCargo({ cargo }: CardCargoProps) {
  return (
    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
      <header className='py-2 px-6 bg-cyan-400 text-white font-bold text-2xl'>
        Cargo
      </header>
      <h3 className='p-3 text bg-slate-200 '> Nome: {cargo.nome}</h3>
      <h3 className='p-3 text bg-slate-200 '> Andar: {cargo.nivel}</h3>
      <h3 className='p-3 text bg-slate-200 '> Ramal: {cargo.salario}</h3>
      <h3 className='p-3 text bg-slate-200 '>Descrição: {cargo.descricao}</h3>

      <div className="flex">

        <Link to={`/editarcargo/${cargo.id}`}
          className='w-full text-slate-100 bg-blue-400 indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>

        <Link to={`/deletarcargo/${cargo.id}`}
          className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 		          
                      flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>

    </div>
  )
}
