import sobreImage from '../../assets/img/sobre.png'
import visaoIcon from '../../assets/img/visao.png'
import missaoIcon from '../../assets/img/missao.png'
import valoresIcon from '../../assets/img/valores.png'
import portfolio from '../../assets/img/portifolio.png'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Larissa from "../../assets/img/Larissa.jpg"
import Rodrigo from "../../assets/img/Rodrigo.jpg"
import Elisa from "../../assets/img/Elisa.jpg"
import Ruan from "../../assets/img/Ruan.jpg"
import Giulia from "../../assets/img/Giulia.jpg"
import Weslley from "../../assets/img/Wesley.jpg"

export default function Sobre() {
  return (
    <section className="max-w-6xl mx-auto p-4 md:p-6 space-y-10 md:space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold border-b pb-2 mb-6 text-center md:text-left">Sobre</h2>

      <img
        src={sobreImage}
        alt="Equipe reunida"
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8">
        <div className="pr-0 md:pr-4 md:border-r border-gray-300 pb-4 md:pb-0">
          <h4 className="text-sm md:text-xs tracking-widest uppercase font-semibold mb-2">Valores</h4>
          <h3 className="text-2xl md:text-3xl font-bold leading-tight">
            Nossa visão é nos conectar com o mundo por meio da inovação.
          </h3>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="flex items-start gap-4 border-b pb-4">
            <img src={visaoIcon} alt="Ícone visão" className="w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Visão</h4>
              <p className="text-sm md:text-base text-gray-600">
                Ser referência em ferramentas digitais para o setor de RH, evoluindo constantemente
                a plataforma para atender às demandas reais do mercado com inovação, praticidade
                e confiabilidade.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b pb-4">
            <img src={missaoIcon} alt="Ícone visão" className="w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Missão</h4>
              <p className="text-sm md:text-base text-gray-600">
                Oferecer uma solução simples, eficiente e acessível para a gestão de Recursos Humanos,
                facilitando o controle de funcionários, cargos, departamentos e salários.
                Nosso objetivo é otimizar o tempo dos profissionais de RH e reduzir falhas manuais, tornando os processos mais ágeis e organizados.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src={valoresIcon} alt="Ícone visão" className="w-8 h-8 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg">Valores</h4>
              <div className="text-sm md:text-base text-gray-600 space-y-1">
                <p>Compromisso com a qualidade e usabilidade;</p>
                <p>Respeito às necessidades dos usuários;</p>
                <p>Transparência e clareza nas funcionalidades;</p>
                <p>Evolução contínua e aprendizado constante;</p>
                <p>Trabalho em equipe e empatia no desenvolvimento!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 md:pt-10">
        <h5 className="text-sm md:text-xs tracking-widest uppercase font-semibold mb-1">Time</h5>
        <h4 className="text-2xl md:text-3xl font-bold mb-6">Nosso Time</h4>

        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="flex-1">
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              Somos um grupo diverso de seis pessoas formadas no bootcamp da Generation Brasil.
              Cada um chegou aqui por um caminho diferente: alguns buscando uma nova carreira,
              outros dando os primeiros passos na tecnologia. Temos apaixonados por front, back, design,
              lógica... Todos unidos pela vontade de aprender, crescer e transformar realidades.
              Nossa força está na pluralidade, no esforço coletivo e na paixão por criar soluções que
              fazem a diferença. Trabalhamos em conjunto para desenvolver, programar e testar as
              funcionalidades da aplicação, buscando aplicar os conhecimentos adquiridos ao longo do
              curso e simular um cenário real de desenvolvimento em equipe.
            </p>

            <p className="text-sm md:text-base text-gray-600 mt-4">Conheça mais sobre a equipe:</p>

            <img
              src={portfolio}
              alt="QR Code"
              className="mt-6 w-32 h-32 md:w-40 md:h-40 object-contain mx-auto md:mx-0"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 md:gap-y-10 w-full"> {/* Aumentei um pouco o gap */}
            {[
              {
                nome: 'Elisa Bicudo',
                foto: Elisa,
                linkedin: 'https://www.linkedin.com/in/elisa-bicudo-lopes/',
                github: 'https://github.com/eblopes23'
              },
              {
                nome: 'Giulia Lopes',
                foto: Giulia,
                linkedin: 'https://www.linkedin.com/in/giulia-l-ferreira/',
                github: 'https://github.com/Giulia-L-Ferreira'
              },
              {
                nome: 'Larissa Soares',
                foto: Larissa,
                linkedin: 'https://www.linkedin.com/in/larissa-soares-da-silva/',
                github: 'https://github.com/LarissaSoaresSilva'
              },
              {
                nome: 'Rodrigo Henrique',
                foto: Rodrigo,
                linkedin: 'https://www.linkedin.com/in/rodrigohenrikeh/',
                github: 'https://github.com/rodrigohenrikeh'
              },
              {
                nome: 'Ruan Barreto',
                foto: Ruan,
                linkedin: 'https://www.linkedin.com/in/ruan-barreto/',
                github: 'https://github.com/BarretoRuan'
              },
              {
                nome: 'Weslley Ferreira',
                foto: Weslley,
                linkedin: 'https://www.linkedin.com/in/weslleyferreira/',
                github: 'https://github.com/wdwf'
              },
            ].map((membro) => (
              <div key={membro.nome} className="flex items-center gap-4 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"> {/* Aumentei o gap */}
                <img
                  src={membro.foto}
                  alt={membro.nome}
                  className="w-20 h-20 object-cover object-center rounded-full border-2 border-rh-primarygrey flex-shrink-0" // Aumentei o tamanho para w-20 h-20 (80px)
                />
                <div>
                  <span className="font-bold text-base md:text-lg">{membro.nome}</span> {/* Aumentei o tamanho do nome para text-base */}
                  <div className="flex gap-3 mt-1"> {/* Aumentei o gap entre os ícones */}
                    <a href={membro.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <FaLinkedin size={22} /> {/* Aumentei o tamanho do ícone para 20 */}
                    </a>
                    <a href={membro.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black">
                      <FaGithub size={22} /> {/* Aumentei o tamanho do ícone para 20 */}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}