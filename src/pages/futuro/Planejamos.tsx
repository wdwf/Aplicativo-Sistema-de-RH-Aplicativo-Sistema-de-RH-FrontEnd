import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import planejamentoImg from '../../assets/img/planejamento.jpg'

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
    <section className="max-w-6xl mx-auto p-6 space-y-12">
      

      <img
        src={planejamentoImg}
        alt="Planejamento futuro"
        className="w-full h-auto object-cover rounded"
      />

      <h2 className="text-3xl font-bold border-b pb-2">O que planejamos para o futuro</h2>
    
     

      <div className="space-y-4">
        {planosFuturos.map((plano, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border-b border-gray-300 pb-4">
                <Disclosure.Button className="flex justify-between w-full text-left font-semibold text-black text-lg">
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
