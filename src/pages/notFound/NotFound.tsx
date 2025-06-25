import { Link } from 'react-router-dom'
import bgNotFound from '../../assets/img/bgNotFound.png'

export default function NotFound() {
  return (
   
      <section className="h-screen flex flex-col items-center justify-center p-4 text-center">
        <img src={bgNotFound} alt="imagem representando que algo não foi encontrado" className='w-full max-w-xs md:max-w-sm lg:max-w-md mb-8' />
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-2 mb-4">Página Não Encontrada</h2>
        <p className="text-base md:text-lg mt-0 text-gray-600 mb-6">Desculpe, a página que você está procurando não existe.</p>
        <Link to="/home" className="mt-0 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-base md:text-lg font-semibold">
          Voltar para a Home
        </Link>
      </section>
   
  )
}
