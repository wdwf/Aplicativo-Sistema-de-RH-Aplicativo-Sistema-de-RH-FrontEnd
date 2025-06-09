import sobreImage from '../../assets/img/sobre.png'
import visaoIcon from '../../assets/img/visao.png'
import missaoIcon from '../../assets/img/missao.png'
import valoresIcon from '../../assets/img/valores.png'
import portfolio from '../../assets/img/portifolio.png'

export default function Sobre() {

  return (

    <section className="max-w-6xl mx-auto p-6 space-y-12">
      <h2 className="text-3xl font-bold border-b pb-2">Sobre</h2>

      <img
        src={sobreImage}
        alt="Equipe reunida"
        className="w-full h-auto object-cover rounded"
      />

      <div className="grid md:grid-cols-2 gap-10">
        <div className="pr-4 border-r border-gray-300">
          <h4 className="text-xs tracking-widest uppercase font-semibold mb-2">Valores</h4>
          <h3 className="text-2xl md:text-3xl font-bold">
            Nossa visão é nos conectar com o mundo por meio da inovação.
          </h3>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4 border-b pb-4">
            <img src={visaoIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Visão</h4>
              <p className="text-sm text-gray-600">
                Ser referência em ferramentas digitais para o setor de RH, evoluindo constantemente
                a plataforma para atender às demandas reais do mercado com inovação, praticidade
                e confiabilidade.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b pb-4">
            <img src={missaoIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Missão</h4>
              <p className="text-sm text-gray-600">
                Oferecer uma solução simples, eficiente e acessível para a gestão de Recursos Humanos,
                facilitando o controle de funcionários, cargos, departamentos e salários.
                Nosso objetivo é otimizar o tempo dos profissionais de RH e reduzir falhas manuais, tornando os processos mais ágeis e organizados.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src={valoresIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Valores</h4>
              <div className="text-sm text-gray-600">
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

      <div className="border-t pt-6 ">
        <h5 className="text-xs tracking-widest uppercase font-semibold mb-1">Time</h5>
        <h4 className="text-2xl font-bold">Nosso Time</h4>
        <p className="text-sm text-gray-600 mt-2 max-w-md">
          Somos um grupo diverso de seis pessoas formadas no bootcamp da Generation Brasil.
          Cada um chegou aqui por um caminho diferente: alguns buscando uma nova carreira,
          outros dados o primeiros passos na tecnologia. Temos apaixonados por front, back, design,
          lógica... Todos unidos pela vontade de aprender, crescer e transformar realidades.
          Nossa força está na pluralidade, no esforço coletivo e na paixão por criar soluções que
          fazem a diferença. Trabalhamos em conjunto para desenvolver, programar e testar as
          funcionalidades da aplicação, buscando aplicar os conhecimentos adquiridos ao longo do
          curso e simular um cenário real de desenvolvimento em equipe. </p>

        <p className="text-sm text-gray-600 mt-2 max-w-md">Conheça mais sobre a equipe:</p>

        <img
          src={portfolio}
          alt="QR Code"
          className="mt-4 w-32 h-32 object-contain"
        />
      </div>
    </section>
  );
}
