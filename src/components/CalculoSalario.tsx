import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { buscar, calcularSalario } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"
import Usuario from "../models/Usuario"
import { AuthContext } from "../contexts/AuthContext"

function CalculoSalario() {

  const { usuario, handleLogout } = useContext(AuthContext)

  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [usuarioId, setUsuarioId] = useState<number>()

  const [horasTrabalhadas, setHorasTrabalhadas] = useState<number>(0)

  const [bonus, setBonus] = useState<number>(0)

  const [descontos, setDescontos] = useState<number>(0)

  const [resultado, setResultado] = useState<any>()

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
        horasTrabalhadas,
        bonus,
        descontos,
        setResultado,
        { headers: { Authorization: `${token}` } }
      )
      ToastAlerta("Salário calculado com sucesso!", "sucesso")
    } catch (err) {
      ToastAlerta("Erro ao calcular salário", "erro")
    }
  }


  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center pt-10">
      <h1 className="text-3xl font-bold mb-6 text-red-700">Calcular Salário</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-yellow-300 p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <label htmlFor="">Selecione o usuario</label>
        <select
          name="usuarioId"
          id="usuarioId"
          value={usuarioId ?? ""}
          onChange={(e) => setUsuarioId(Number(e.target.value))}
          className="w-full p-2 rounded border"
          required
        >
          <option value="" disabled>Selecione o usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nome}
            </option>
          ))}
        </select>


        <input
          type="number"
          placeholder="Horas trabalhadas"
          value={horasTrabalhadas}
          onChange={(e) => setHorasTrabalhadas(Number(e.target.value))}
          className="w-full p-2 rounded border"
          required
        />

        <input
          type="number"
          placeholder="Bônus (opcional)"
          value={bonus}
          onChange={(e) => setBonus(Number(e.target.value))}
          className="w-full p-2 rounded border"
        />

        <input
          type="number"
          placeholder="Descontos (opcional)"
          value={descontos}
          onChange={(e) => setDescontos(Number(e.target.value))}
          className="w-full p-2 rounded border"
        />

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
        >
          Enviar
        </button>
      </form>

      {resultado && (
        <div className="bg-white mt-6 p-4 rounded shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">
            Usuário:{" "}
            {usuarios.find((u) => u.id === usuarioId)?.nome || "Desconhecido"}
          </h2>
          <p>Salário Base: R$ {resultado.salarioBase}</p>
          <p>Salário Proporcional: R$ {resultado.salarioProporcional}</p>
          <p>Bônus: R$ {resultado.bonus}</p>
          <p>Descontos: R$ {resultado.descontos}</p>
          <p className="font-bold text-green-700">
            Salário Líquido: R$ {resultado.salarioLiquido}
          </p>
        </div>
      )}
    </div>
  )
}
export default CalculoSalario;