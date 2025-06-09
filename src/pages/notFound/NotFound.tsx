import { Link } from 'react-router-dom'
import bgNotFound from '../../assets/img/bgNotFound.png'

export default function NotFound() {
  return (
    <div>
      <section className="h-screen flex flex-col items-center pt-16 text-center">
        <img src={bgNotFound} alt="imagem representando que algo não foi encontrado" className='max-w-[350px]' />
        <h2 className="text-3xl font-bold border-b pb-2">Página Não Encontrada</h2>
        <p className="text-lg mt-4 text-gray-600">Desculpe, a página que você está procurando não existe.</p>
        <Link to="/home" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Voltar para a Home
        </Link>
      </section>
    </div>
  )
}
