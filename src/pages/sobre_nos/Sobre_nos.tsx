
import sobreImage from '../../assets/img/sobre.png';
import visaoIcon from '../../assets/img/visao.png';
import missaoIcon from '../../assets/img/missao.png';
import valoresIcon from '../../assets/img/valores.png';

export default function Sobre() {
  return (
    <section className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Título */}
      <h2 className="text-3xl font-bold border-b pb-2">Sobre</h2>

      {/* Imagem */}
      <img
        src={sobreImage}
        alt="Equipe reunida"
        className="w-full h-auto object-cover rounded"
      />

      {/* Bloco principal - Visão, Missão, Valores */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Texto de valores */}
        <div className="pr-4 border-r border-gray-300">
          <h4 className="text-xs tracking-widest uppercase font-semibold mb-2">Valores</h4>
          <h3 className="text-2xl md:text-3xl font-bold">
            Nossa visão é nos conectar com o mundo por meio da inovação.
          </h3>
        </div>

        {/* Bloco de cards */}
        <div className="space-y-8">
          {/* Item */}
          <div className="flex items-start gap-4 border-b pb-4">
            <img src={visaoIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Visão</h4>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum sapien non enim tristique facilisis.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-b pb-4">
            <img src={missaoIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Missão</h4>
              <p className="text-sm text-gray-600">
                Donec facilisis sit amet ligula porta mollis. Vestibulum nec commodo dui.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img src={valoresIcon} alt="Ícone visão" className="w-6 h-6 mt-1" />
            <div>
              <h4 className="font-bold">Valores</h4>
              <p className="text-sm text-gray-600">
                Vestibulum nec commodo dui. Donec facilisis sit amet ligula porta mollis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Time */}
      <div className="border-t pt-6 ">
        <h5 className="text-xs tracking-widest uppercase font-semibold mb-1">Time</h5>
        <h4 className="text-2xl font-bold">Nosso Time</h4>
        <p className="text-sm text-gray-600 mt-2 max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum sapien non enim tristique facilisis.
        </p>
      </div>
    </section>
  );
}
