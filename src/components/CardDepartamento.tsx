import React from 'react'
import { Link } from 'react-router-dom'
import Departamento from '../models/Departamento'


interface CardDepartamentoProps{
    departamento: Departamento
}

function CardDepartamento({ departamento }: CardDepartamentoProps) {

    return (

        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-cyan-400 text-white font-bold text-2xl'>
                Departamento
            </header>
            <h3 className='p-3 text bg-slate-200 '> Nome: {departamento.nome}</h3>
            <h3 className='p-3 text bg-slate-200 '>Descrição: {departamento.descricao}</h3>
            <h3 className='p-3 text bg-slate-200 '> Andar: {departamento.andar}</h3>
            <h3 className='p-3 text bg-slate-200 '> Ramal: {departamento.ramal}</h3>

            <div className="flex">

                <Link to={`/editardepartamento/${departamento.id}`}
                    className='w-full text-slate-100 bg-blue-400 indigo-400 hover:bg-indigo-800 
                    flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletardepartamento/${departamento.id}`}
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 		          
                      flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>

    
  )
}

export default CardDepartamento