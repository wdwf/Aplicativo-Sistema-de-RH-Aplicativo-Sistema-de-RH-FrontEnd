import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { buscar, calcularSalario } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"
import Usuario from "../models/Usuario"
import { AuthContext } from "../contexts/AuthContext"
import { X } from "lucide-react"

function CalculoSalario() {

  const { usuario, handleLogout } = useContext(AuthContext)

  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [usuarioId, setUsuarioId] = useState<number>()

  const [horasTrabalhadas, setHorasTrabalhadas] = useState<number | string>("")

  const [bonus, setBonus] = useState<number | string>("")

  const [descontos, setDescontos] = useState<number | string>("")

  const [resultado, setResultado] = useState<any>()

  const [valorHorasExtras, setValorHorasExtras] = useState<number>(0)

  const [salarioBase, setSalarioBase] = useState<number>(0)

  const token = usuario.token

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token, navigate])

  useEffect(() => {
    if (token) {
      buscar("/usuario", setUsuarios, {
        headers: { Authorization: `${token}` }
      })
    }
  }, [token])

  useEffect(() => {

    const usuarioSelecionado = usuarios.find((u) => u.id === usuarioId)
    if (usuarioSelecionado?.cargo) {
      setSalarioBase(Number(usuarioSelecionado.cargo.salario))
    }
  }, [usuarioId, usuarios])

  useEffect(() => {
    const horas = Number(horasTrabalhadas)
    if (!usuarioId || !salarioBase || isNaN(horas)) return

    const horasExtras = horas - 220
    if (horasExtras > 0) {
      const valorHora = salarioBase / 220
      const totalExtras = valorHora * horasExtras
      setValorHorasExtras(totalExtras)
    } else {
      setValorHorasExtras(0)
    }
  }, [horasTrabalhadas, salarioBase, usuarioId])

  const handleSubmit = async (e: React.FormEvent) => {

    console.log(usuarioId);
    e.preventDefault()
    if (!usuarioId) {
      ToastAlerta("Selecione um usuário", "erro")
      return
    }


    try {
      await calcularSalario(
        usuarioId,
        Number(horasTrabalhadas),
        Number(bonus),
        Number(descontos),
        setResultado,
        { headers: { Authorization: `${token}` } }
      )
      ToastAlerta("Salário calculado com sucesso!", "sucesso")
    } catch (err) {
      ToastAlerta("Erro ao calcular salário", "erro")
    }
  }

  function calcularDescontosDetalhados(totalDesconto: number) {
    const percentuais = {
      inss: 0.08,
      ir: 0.10,
      vt: 0.06,
      plano: 0.03,
    }

    const totalPercentual =
      percentuais.inss + percentuais.ir + percentuais.vt + percentuais.plano

    return {
      inss: (percentuais.inss / totalPercentual) * totalDesconto,
      ir: (percentuais.ir / totalPercentual) * totalDesconto,
      vt: (percentuais.vt / totalPercentual) * totalDesconto,
      plano: (percentuais.plano / totalPercentual) * totalDesconto,
    }
  }
  const options = usuarios.map(user => ({
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
      <div className={`flex ${resultado ? "flex-row gap-8 items-start" : "flex-col items-justify "} justify-center`} >
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

            <form
              onSubmit={handleSubmit}
              className="bg-white text-rh-primarygrey p-8 rounded-xl shadow-xl w-full max-w-md relative space-y-4"
            >
              <div>
                <label htmlFor="usuarioId" className="mb-2">Selecione o Colaborador</label>
                <Select
                  options={options}
                  styles={customStyles}
                  placeholder="Selecione um usuário"
                  value={options.find((option) => option.value === usuarioId)}
                  onChange={(selected) => setUsuarioId(selected?.value)}
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
                  onChange={(e) => setHorasTrabalhadas(Number(e.target.value))}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-secondarygrey"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Bônus R$</label>
                <input
                  type="number"
                  placeholder="Bônus (opcional)"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-secondarygrey"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium">Descontos R$</label>
                <input
                  type="number"
                  placeholder="Descontos (opcional)"
                  value={descontos}
                  onChange={(e) => setDescontos(Number(e.target.value))}
                  className="w-full p-2 rounded border border-rh-primarygrey focus:border-rh-secondaryblue focus:ring-2 focus:ring-rh-secondaryblue outline-none text-rh-secondarygrey"
                />
              </div>
              <button
                type="submit"
                className="bg-rh-primarygrey text-white p-2 rounded hover:bg-rh-secondaryblue w-full"
              >
                Calcular
              </button>
            </form>
          </div>
          {resultado && (
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl border text-rh-primarygrey">
              <h2 className="text-3xl font-bold text-rh-primarygrey">Recibo</h2>
              <p className="text-rh-secondarygrey mb-4">Referente ao Mês / Ano</p>
              <p className="text-2xl font-semibold text-rh-primarygrey mb-3 ">Junho/2025</p>

              <div className="bg-gray-100 border rounded-lg p-4 mb-2">
                <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Empregador</p>
                <p className="font-bold text-rh-secondarygrey">RHCORP</p>
                <p className="font-bold text-rh-secondarygrey">CNPJ: 000.000.000-00</p>
              </div>

              <div className="bg-gray-100 border rounded-lg p-3 grid grid-cols-4 gap-15 mb-2">
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Colaborador</p>
                  <p className="font-bold text-rh-secondarygrey">{usuarios.find((u) => u.id === usuarioId)?.nome || "Desconhecido"}</p>
                </div>
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Funcional</p>
                  <p className="font-bold text-rh-secondarygrey"> 0.000.000</p>
                </div>
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Cargo</p>
                  <p className="font-bold text-rh-secondarygrey">{usuarios.find((u) => u.id === usuarioId)?.cargo?.nome || "Cargo"}</p>
                </div>
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Nível</p>
                  <p className="font-bold text-rh-secondarygrey">{usuarios.find((u) => u.id === usuarioId)?.cargo?.nivel || "Junior"}</p>

                </div>
              </div>

              <div className="grid grid-cols-4 gap-15 bg-gray-100 border rounded-lg p-3 text-sm mb-2">
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Salário Base</p>
                  <p className="font-bold text-rh-secondarygrey">
                    {resultado.salarioBase.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Salário PR </p>
                  <p className="font-bold text-rh-secondarygrey">
                    {resultado.salarioProporcional.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>

                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1"> Horas Extras</p>
                  <p className="font-bold text-green-900">
                    {valorHorasExtras.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
                <div>
                  <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Bônus</p>
                  <p className="font-bold text-green-900">
                    {resultado.bonus.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-15 bg-gray-100 border border-b-0 rounded-t-lg p-3 text-sm ">
                {(() => {
                  const detalhes = calcularDescontosDetalhados(resultado.descontos);

                  return (
                    <>
                      <div>
                        <p className="text-1x1 font-bold text-rh-primarygrey mb-1">INSS (8%): </p>
                        <p className="text-red-500 font-semibold"> {detalhes.inss.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                      </div>
                      <div>
                        <p className="text-1x1 font-bold text-rh-primarygrey mb-1">IR (10%):</p>
                        <p className="text-red-500 font-semibold"> {detalhes.ir.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                      </div>
                      <div>
                        <p className="text-1x1 font-bold text-rh-primarygrey mb-1">VT (6%): </p>
                        <p className="text-red-500 font-semibold">{detalhes.vt.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                      </div>
                      <div>
                        <p className="text-1x1 font-bold text-rh-primarygrey mb-1">Plano (3%): </p>
                        <p className="text-red-500 font-semibold"> {detalhes.plano.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</p>
                      </div>
                    </>
                  );

                })()}
</div>
              <div className="text-center grid grid-cols-2  bg-gray-100 border border-t-0 rounded-b-lg text-sm mb-2">
                 <div className="font-extrabold text-red-500 ">Descontos Totais: </div>
                <div className=" text-red-800 font-bold"> {resultado.descontos.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-gray-100 border rounded-lg p-4 text-center text-sm">
                <p className="text-rh-secondarypurple  font-bold text-2xl">Salário Líquido</p>
                <p className="text-rh-secondarypurple font-bold text-2xl">
                  {resultado.salarioLiquido.toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
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