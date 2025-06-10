import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { buscar } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"
import Usuario from "../models/Usuario"
import { AuthContext } from "../contexts/AuthContext"
import { X } from "lucide-react"


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
  const token = usuario.token;

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
    valoresDetalhados()
    calcularDescontosDetalhados(Number(descontos))
    setIsOpen(true)
  }

  function valoresDetalhados() {
    const horas = Number(horasTrabalhadas)
    if (!usuarioSelecionado || isNaN(horas)) {
      ToastAlerta("Preencha os campos corretamente", "info")
      return;
    }
    const salario = usuarioSelecionado.cargo?.salario || 0

    const horasExcedentesTrabalhadas = horas - 220
    const valorHoraNormal = salario / 220 // 220 horas mensais contando 44 horas semanais
    const valorHoraExtra = valorHoraNormal * 1.5 // 50% a mais para horas extras
    const valorFinal = valorHoraExtra * horasExcedentesTrabalhadas

    setValorHorasExtras(horasExcedentesTrabalhadas > 0 ? valorHoraExtra * horasExcedentesTrabalhadas : 0)
    // setSalarioProporsional(valorHoraNormal * horas)
    setSalarioProporsional(salario + valorFinal)
  }

  function calcularDescontosDetalhados(valorDesconto: number) {
    const percentuais = {
      inss: 0.08,
      ir: 0.10,
      vt: 0.06,
      plano: 0.03,
    }

    const valorInss = salarioProporsional * percentuais.inss;
    const valorIr = salarioProporsional * percentuais.ir;
    // const valorInss = usuarioSelecionado.cargo?.salario ? usuarioSelecionado.cargo.salario * percentuais.inss : 0;
    // const valorIr = usuarioSelecionado.cargo?.salario ? usuarioSelecionado.cargo.salario * percentuais.ir : 0;
    const valorVt = usuarioSelecionado.cargo?.salario ? usuarioSelecionado.cargo.salario * percentuais.vt : 0;
    const valorPlano = usuarioSelecionado.cargo?.salario ? usuarioSelecionado.cargo.salario * percentuais.plano : 0;
    const totalDesconto = valorInss + valorIr + valorVt + valorPlano;

    setValoresDescontos({
      inss: valorInss,
      ir: valorIr,
      vt: valorVt,
      plano: valorPlano,
      valorTotal: totalDesconto
    })
    setSalarioLiquido(
      (usuarioSelecionado.cargo?.salario || 0) + valorHorasExtras + Number(bonus) - totalDesconto
    )
    console.log("Valores Descontos:", totalDesconto);
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
      <div className={`flex ${isOpen ? "flex-row gap-8 items-start" : "flex-col items-justify "} justify-center`} >
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 gap-15 w-full ">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">


            <div className="text-center relative mb-4">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="flex absolute right-0 p-2 bg-rh-primarygrey text-white rounded-full hover:-translate-y-1 transition-all duration-500 hover:bg-rh-secondaryblue"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
              <h1 className="text-3xl font-bold text-rh-primarygrey mb-2">
                Calcular Salário
              </h1>
              <p className="text-1x1 text-rh-secondarygrey">
                Preencha os dados abaixo
              </p>

            </div>

            <div
              className="bg-white text-rh-primarygrey p-8 rounded-xl shadow-xl w-full max-w-md relative space-y-4"
            >
              <div>
                <label htmlFor="usuarioId" className="mb-2">Selecione o Colaborador</label>
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
                <label className="block mb-2 font-medium">
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
                <label className="block mb-2 font-medium">Bônus R$</label>
                <input
                  type="number"
                  placeholder="Bônus (opcional)"
                  value={bonus}
                  onChange={(e) => { setBonus(Number(e.target.value)); setIsOpen(false) }}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-primarygrey"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Descontos Adicionais em R$</label>
                <input
                  type="number"
                  placeholder="Descontos (opcional)"
                  value={descontos}
                  onChange={(e) => {
                    setDescontos(Number(e.target.value));
                    setIsOpen(false)
                  }}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-primarygrey"
                />
              </div>
              <button
                onClick={handleCalc}
                className="bg-rh-primarygrey text-white p-2 rounded hover:bg-rh-secondaryblue w-full"
              >
                Calcular
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl border text-rh-primarygrey">
              <h2 className="text-xl font-semibold text-rh-primarygrey">Recibo</h2>
              <p className="text-rh-secondarygrey mb-4">Referente ao Mês / Ano</p>
              <p className="font-semibold text-rh-primarygrey mb-3">Junho/2025</p>

              <div className="bg-gray-100 border rounded-lg p-2 mb-2">
                <p className="text-sm font-semibold text-rh-primarygrey mb-0.5">Empregador</p>
                <p className="text-xs font-semibold text-rh-secondarygrey">RHCORP</p>
                <p className="text-xs font-semibold text-rh-secondarygrey">CNPJ: 000.000.000-00</p>
              </div>

              {/* <div className="bg-gray-100 border rounded-lg p-3 grid grid-cols-4 gap-15 mb-2"> */}
              <div className="bg-gray-100 border rounded-lg p-3 flex gap-6 mb-2">
                <div className="min-w-22">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Colaborador</p>
                  <p className="text-xs font-semibold text-rh-secondarygrey">{usuarioSelecionado.nome}</p>
                </div>
                <div className="min-w-36">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Funcional</p>
                  <p className="text-xs font-semibold text-rh-secondarygrey">0.000.000</p>
                </div>
                <div className="min-w-36">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Cargo</p>
                  <p className="text-xs font-semibold text-rh-secondarygrey">{usuarioSelecionado.cargo.nome}</p>
                </div>
                <div className="min-w-36">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Nível</p>
                  <p className="text-xs font-semibold text-rh-secondarygrey">{usuarioSelecionado.cargo.nivel}</p>
                </div>
              </div>

              <div className="flex gap-6 bg-gray-100 border rounded-lg p-3 mb-2">
                {/* <div className="grid grid-cols-4 gap-15 bg-gray-100 border rounded-lg p-3 mb-2"> */}
                <div className="min-w-22 flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Salário Base</p>
                  <p className="text-xs font-bold text-rh-secondarygrey">
                    {usuarioSelecionado.cargo.salario.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="min-w-36 flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Salário Proporcional</p>
                  <p className="text-xs font-bold text-rh-secondarygrey">
                    {salarioProporsional.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>

                <div className="min-w-36 flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Horas Extras</p>
                  <p className="text-xs font-bold text-green-900">
                    {valorHorasExtras.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div className="min-w-36 flex flex-col justify-between">
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Bônus</p>
                  <p className="text-xs font-bold text-green-900">
                    {bonus.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-15 bg-gray-100 border border-b-0 rounded-t-lg p-3 text-sm ">
                <div>
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">INSS (8%): </p>
                  <p className="text-xs text-red-500 font-semibold"> {valoresDesconto.inss.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">IR (10%):</p>
                  <p className="text-xs text-red-500 font-semibold"> {valoresDesconto.ir.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">VT (6%): </p>
                  <p className="text-xs text-red-500 font-semibold">{valoresDesconto.vt.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-rh-primarygrey mb-1">Plano (3%): </p>
                  <p className="text-xs text-red-500 font-semibold"> {valoresDesconto.plano.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                </div>
              </div>
              <hr />
              <div className="text-center grid grid-cols-2 py-0.5 bg-gray-100 border border-t-0 rounded-b-lg text-sm mb-2">
                <div className="text-sm font-extrabold text-red-500 ">Descontos Totais: </div>
                <div className="text-sm text-red-800 font-bold"> {valoresDesconto.valorTotal.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-gray-100 border rounded-lg p-4 text-center text-sm">
                <p className="text-rh-secondarypurple  font-bold text-lg">Salário Líquido:</p>
                <p className="text-rh-secondarypurple font-bold text-lg">
                  {salarioLiquido.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CalculoSalario;