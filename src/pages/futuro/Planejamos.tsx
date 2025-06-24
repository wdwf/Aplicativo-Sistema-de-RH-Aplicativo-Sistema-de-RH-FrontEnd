import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import planejamentoImg from '../../assets/img/planejamento.jpg'
import { LuMouse } from "react-icons/lu";

const planosFuturos = [
  {
    titulo: 'Integração ao email',
    descricao: 'Sistema de notificações automáticas por email para avisar sobre novos pagamentos, mudanças de cargo, vencimento de contratos e outros eventos importantes.',
  },
  {
    titulo: 'Dashboard com gráficos',
    descricao: 'Visualização gráfica de dados relacionados aos funcionários, como distribuição por cargo, tempo de empresa, médias salariais e outros indicadores úteis para o setor de RH.',
  },
  {
    titulo: 'Relatórios personalizados',
    descricao: 'Geração de relatórios com filtros personalizados para análise detalhada dos dados de RH.',
  },
  {
    titulo: 'Exportação de dados',
    descricao: 'Opção de exportar dados em diferentes formatos, como CSV e PDF, para facilitar o uso externo.',
  },
  {
    titulo: 'Integração com folha de pagamento',
    descricao: 'Conexão automática com sistemas de folha de pagamento para atualização em tempo real.',
  },
  {
    titulo: 'Histórico de cargos e salários',
    descricao: 'Armazenamento do histórico completo de alterações salariais e de cargos dos colaboradores.',
  },
]

function Planejamos() {

  return (
    <section className="w-full mx-auto pb-6 flex flex-col items-center px-4 md:px-0">
      <img
        src={planejamentoImg}
        alt="Planejamento futuro"
        className="w-full object-cover max-h-64 md:max-h-96"
      />
      <LuMouse className='w-8 h-8 animate-bounce mt-4' />


      <div className="space-y-4 w-full max-w-3xl mt-6 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold border-b pb-2 text-center md:text-left">O que planejamos para o futuro</h2>

        {planosFuturos.map((plano, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border-b border-gray-300 pb-4">
                <Disclosure.Button className="flex cursor-pointer justify-between w-full text-left font-semibold text-black text-base md:text-lg">
                  {plano.titulo}
                  <ChevronUpIcon
                    className={`w-4 h-4 text-black transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="mt-2 text-sm text-gray-700 leading-relaxed">
                  {plano.descricao}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </section>
  )
}

export default Planejamos
