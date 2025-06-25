import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { buscar } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"
import Usuario from "../models/Usuario"
import { AuthContext } from "../contexts/AuthContext"
import { X } from "lucide-react"
import { useReactToPrint } from "react-to-print";



interface UsuarioSelecionado {
  cargo: {
    id: number;
    nome: string;
    nivel: string;
    salario: number;
    descricao: string;
    departamento: {
      id: number;
      nome: string;
      andar: string;
      descricao: string;
      ramal: number;
    }
  }
  foto: string;
  id: number;
  nome: string;
  senha: string;
  usuario: string;
}

function CalculoSalario() {

  const navigate = useNavigate()
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario?.token;

  const [usuarioId, setUsuarioId] = useState<number>()
  const [horasTrabalhadas, setHorasTrabalhadas] = useState<number | string>("")
  const [bonus, setBonus] = useState<number | string>("")
  const [descontos, setDescontos] = useState<number | string>("")
  const [isOpen, setIsOpen] = useState(false)
  const [valorHorasExtras, setValorHorasExtras] = useState<number>(0)
  const [salarioProporsional, setSalarioProporsional] = useState<number>(0)


  const [listUsuarios, setListUsuarios] = useState<Usuario[]>([])
  const [salarioLiquido, setSalarioLiquido] = useState(0)
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<UsuarioSelecionado>({} as UsuarioSelecionado)
  const [valoresDesconto, setValoresDescontos] = useState({
    inss: 0,
    ir: 0,
    vt: 0,
    plano: 0,
    valorTotal: 0
  })

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const dataAtual = new Date();
  const mesAnoAtual = `${dataAtual.toLocaleString('pt-BR', { month: 'long' }).replace(/^./, str => str.toUpperCase())}/${dataAtual.getFullYear()}`;

  function buscarUsuarios() {
    buscar("/usuario", setListUsuarios, {
      headers: { Authorization: `${token}` }
    })

  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token === '') return;
    if (!token) {
      ToastAlerta('Você precisa estar logado!', 'info')
      handleLogout();
      navigate('/')
    }
    else {
      buscarUsuarios()
    }
  }, [token])


  useEffect(() => {
    const theUser = listUsuarios.find((u) => u.id === usuarioId)
    setUsuarioSelecionado(theUser as UsuarioSelecionado)
  }, [usuarioId])

  function handleCalc() {
    const horas = Number(horasTrabalhadas)
    if (!usuarioSelecionado || isNaN(horas)) {
      ToastAlerta("Preencha os campos corretamente", "info")
      return;
    }
    const { salarioProporcionalCalculado, valorHorasExtrasCalculado } = valoresDetalhados();

    setSalarioProporsional(salarioProporcionalCalculado);
    setValorHorasExtras(valorHorasExtrasCalculado);

    calcularDescontosDetalhados(salarioProporcionalCalculado, Number(descontos));
    setIsOpen(true)
  }

  function valoresDetalhados() {
    const horas = Number(horasTrabalhadas)
    if (!usuarioSelecionado || isNaN(horas)) {
      ToastAlerta("Preencha os campos corretamente", "info")
      return;
    }
    const salario = usuarioSelecionado.cargo?.salario || 0
    const horasExcedentesTrabalhadas = horas - 220;
    const valorHoraNormal = salario / 220;
    const valorHoraExtra = valorHoraNormal * 1.5;
    const valorHorasExtrasCalculado = horasExcedentesTrabalhadas > 0 ? valorHoraExtra * horasExcedentesTrabalhadas : 0;
    const salarioProporcionalCalculado = salario + valorHorasExtrasCalculado;

    return { salarioProporcionalCalculado, valorHorasExtrasCalculado };
  }

  function calcularDescontosDetalhados(salarioBaseParaDescontos: number, valorDesconto: number) {
    const percentuais = {
      inss: 0.08,
      ir: 0.10,
      vt: 0.06,
      plano: 0.03,
    }

    const valorInss = salarioBaseParaDescontos * percentuais.inss;
    const valorIr = salarioBaseParaDescontos * percentuais.ir;
    const valorVt = usuarioSelecionado.cargo?.salario * percentuais.vt || 0;
    const valorPlano = usuarioSelecionado.cargo?.salario * percentuais.plano || 0;
    const totalDesconto = valorInss + valorIr + valorVt + valorPlano + valorDesconto;


    setValoresDescontos({
      inss: valorInss,
      ir: valorIr,
      vt: valorVt,
      plano: valorPlano,
      valorTotal: totalDesconto
    })

    setSalarioLiquido(
      salarioBaseParaDescontos + Number(bonus) - totalDesconto
    );

  }

  const options = listUsuarios.map(user => ({
    value: user.id,
    label: user.nome
  }))

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#9778F6" : "white",
      color: "#212120",
      cursor: "pointer",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "0.25rem",
      borderColor: "#212120",
      boxShadow: state.isFocused ? "0 0 0 2px #0369B5 " : "none",
      "&:hover": {
        borderColor: "#212120",
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#212120",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#848681",
    }),
  };


  return (
    <>
<div className="fixed inset-0 z-40 bg-white/30 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-8 w-full">
        
          <div className={`bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 flex-shrink-0 flex-1 max-h-[calc(100vh-2rem)] overflow-y-auto ${isOpen ? 'hidden' : 'block'} sm:block`}>
            <div className="text-center relative mb-4">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="absolute top-0 right-0 p-2 bg-rh-primarygrey text-white rounded-full hover:-translate-y-1 transition-all duration-500 hover:bg-rh-secondaryblue"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-rh-primarygrey mb-2">
                Calcular Salário
              </h1>
              <p className="text-sm sm:text-base text-rh-secondarygrey">
                Preencha os dados abaixo
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="usuarioId" className="block mb-2 text-sm sm:text-base font-medium text-rh-primarygrey">Selecione o Colaborador</label>
                <Select
                  options={options}
                  styles={customStyles}
                  placeholder="Selecione um usuário"
                  value={options.find((option) => option.value === usuarioId)}
                  onChange={(selected) => { setUsuarioId(selected?.value); setIsOpen(false) }}
                  isSearchable
                />
              </div>
              <div>
                <label className="block mb-2 text-sm sm:text-base font-medium text-rh-primarygrey">
                  Horas Trabalhadas:
                </label>
                <input
                  type="number"
                  placeholder="Horas trabalhadas"
                  value={horasTrabalhadas}
                  onChange={(e) => { setHorasTrabalhadas(Number(e.target.value)); setIsOpen(false) }}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-primarygrey"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm sm:text-base font-medium text-rh-primarygrey">Bônus R$</label>
                <input
                  type="number"
                  placeholder="Bônus (opcional)"
                  value={bonus}
                  onChange={(e) => { setBonus(Number(e.target.value)); setIsOpen(false) }}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-secondaryblue outline-none text-rh-primarygrey"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm sm:text-base font-medium text-rh-primarygrey">Descontos Adicionais em R$</label>
                <input
                  type="number"
                  placeholder="Descontos (opcional)"
                  value={descontos}
                  onChange={(e) => {
                    setDescontos(Number(e.target.value));
                    setIsOpen(false);
                  }}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-primarygrey"
                />
              </div>
              <button
                onClick={handleCalc}
                className="bg-rh-primarygrey text-white p-2 rounded hover:bg-rh-secondaryblue w-full text-base sm:text-lg"
              >
                Calcular
              </button>
            </div>
          </div>

          {isOpen && (
            <div ref={contentRef} className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl border text-rh-primarygrey print:m-4 print:p-8 print:shadow-none print:border-none relative flex-1 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-rh-primarygrey text-white rounded-full hover:-translate-y-1 transition-all duration-500 hover:bg-rh-secondaryblue sm:hidden"
                aria-label="Fechar recibo"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl sm:text-2xl font-semibold text-rh-primarygrey mb-2">Recibo de Pagamento</h2>
              <p className="text-sm sm:text-base text-rh-secondarygrey mb-1">Referente ao Mês / Ano</p>
              <p className="font-semibold text-base sm:text-lg text-rh-primarygrey mb-3">{mesAnoAtual}</p>

              <div className="bg-gray-100 border rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-rh-primarygrey mb-0.5">Empregador</p>
                <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">RHCORP</p>
                <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">CNPJ: 000.000.000-00</p>
              </div>

              <div className="bg-gray-100 border rounded-lg p-3 mb-3 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Colaborador</p>
                  <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">{usuarioSelecionado.nome}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Funcional</p>
                  <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">0.000.000</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Cargo</p>
                  <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">{usuarioSelecionado.cargo.nome}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Nível</p>
                  <p className="text-xs sm:text-sm font-semibold text-rh-secondarygrey">{usuarioSelecionado.cargo.nivel}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 bg-gray-100 border rounded-lg p-3 mb-3">
                <div className="flex-1 min-w-[120px] flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Salário Base</p>
                  <p className="text-xs sm:text-sm font-bold text-rh-secondarygrey">
                    {usuarioSelecionado.cargo.salario.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="flex-1 min-w-[120px] flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Salário Proporcional</p>
                  <p className="text-xs sm:text-sm font-bold text-rh-secondarygrey">
                    {salarioProporsional.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="flex-1 min-w-[120px] flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Horas Extras</p>
                  <p className="text-xs sm:text-sm font-bold text-green-900">
                    {valorHorasExtras.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="flex-1 min-w-[120px] flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Bônus</p>
                  <p className="text-xs sm:text-sm font-bold text-green-900">
                    {Number(bonus).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 bg-gray-100 border border-b-0 rounded-t-lg p-3 text-sm">
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">INSS (8%): </p>
                  <p className="text-xs sm:text-sm text-red-500 font-semibold"> {valoresDesconto.inss.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">IR (10%):</p>
                  <p className="text-xs sm:text-sm text-red-500 font-semibold"> {valoresDesconto.ir.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">VT (6%): </p>
                  <p className="text-xs sm:text-sm text-red-500 font-semibold">{valoresDesconto.vt.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Plano (3%): </p>
                  <p className="text-xs sm:text-sm text-red-500 font-semibold"> {valoresDesconto.plano.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
              </div>
              <hr />
              <div className="text-center grid grid-cols-2 py-2 bg-gray-100 border border-t-0 rounded-b-lg text-sm mb-3">
                <div className="text-sm sm:text-base font-extrabold text-red-500 ">Descontos Totais: </div>
                <div className="text-sm sm:text-base text-red-800 font-bold"> {valoresDesconto.valorTotal.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-gray-100 border rounded-lg p-4 text-center text-sm mb-4">
                <p className="text-rh-secondarypurple font-bold text-lg sm:text-xl">Salário Líquido:</p>
                <p className="text-rh-secondarypurple font-bold text-lg sm:text-xl">
                  {salarioLiquido.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                </p>
              </div>
              
              <div className="flex justify-center">
                <button onClick={reactToPrintFn} className="bg-rh-primarygrey text-white p-2 rounded hover:bg-rh-secondaryblue w-full text-base sm:text-lg print:hidden">
                  Imprimir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default CalculoSalario;