import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cargo from "../models/Cargo";
import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { Hourglass, RotatingLines } from "react-loader-spinner";
import Departamento from "../models/Departamento";
import colbgleft from "../assets/img/colbgleft.png";
import colbgright from "../assets/img/colbgright.png";

export default function FormCargo() {
  const navigate = useNavigate();

  const [cargo, setCargo] = useState<Cargo>({
    id: "",
    nome: "",
    nivel: "",
    salario: "",
    descricao: "",
    departamento: null,
  })
  const [listaDepartamentos, setListaDepartamentos] = useState<Departamento[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token
  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/cargo/${id}`, setCargo, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  async function buscarDepartamentos() {
    try {
      await buscar('/departamento', setListaDepartamentos, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      }
    }
  }

  function atualizarDepartamento(e: ChangeEvent<HTMLSelectElement>) {
    const departamentoId = parseInt(e.target.value);

    setCargo({
      ...cargo,
      departamento: {
        id: departamentoId,
      } as Departamento
    });
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCargo({
      ...cargo,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate("/home")
  }

  async function gerarNovoCargo(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {

        const cargoConvertido = {
          ...cargo,
          salario: Number(cargo.salario),
          id: Number(cargo.id)
        }
        console.log(cargoConvertido);

        await atualizar(`/cargo`, cargoConvertido, setCargo, {
          headers: { 'Authorization': token }
        })
        ToastAlerta("O Cargo foi atualizado com sucesso!", "sucesso")
      } catch (error: any) {
        if (error.toString().includes('403')) {
          // handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o cargo.", "erro")
        }

      }
    } else {
      try {

        const cargoConvertido = {
          ...cargo,
          salario: Number(cargo.salario)
        }
        console.log(cargoConvertido);


        await cadastrar(`/cargo`, cargoConvertido, setCargo, {
          headers: { 'Authorization': token }
        })
        ToastAlerta("O Cargo foi cadastrado com sucesso!", "sucesso")
      } catch (error: any) {
        if (error.toString().includes('403')) {
          // handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o cargo.", "erro")
        }

      }
    }

    setIsLoading(false)
    retornar()
  }

  useEffect(() => {
    if (token === '') return;
    if (!token) {
      ToastAlerta('Você precisa estar logado!', 'info')
      handleLogout();
      navigate('/')
    }
    else {
      buscarDepartamentos()
      if (id !== undefined) {
        buscarPorId(id)
      }
      setLoadingPage(false);
    }
  }, [token, id])

  if (loadingPage) {
    return <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={['#306cce', '#72a1ed']}
    />
  }

  return (
    <div className="flex min-h-screen relative">
      <img src={colbgleft} alt="decorativo" className="sticky top-0 h-screen" />
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          {id === undefined ? 'Cadastrar Cargo' : 'Editar Cargo'}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoCargo}>
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nome" className="w-full pl-3 font-normal">Nome do Cargo</label>
              <input
                className="border-2 border-slate-700 rounded p-2"
                type="text"
                placeholder="..."
                name='nome'
                value={cargo.nome}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="nivel">Nivel do Cargo</label>
              <input
                className="border-2 border-slate-700 rounded p-2"
                type="text"
                placeholder="..."
                name='nivel'
                value={cargo.nivel}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="salario">Salario do Cargo</label>
              <input
                className="border-2 border-slate-700 rounded p-2"
                type="number"
                placeholder="..."
                name='salario'
                value={cargo.salario}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="descricao">Descrição do Cargo</label>
              <textarea
                name='descricao'
                placeholder="..."
                className="border-2 border-slate-700 rounded p-2"
                id=""
                value={cargo.descricao}
                required
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="departamento" className="w-full pl-3 font-normal">Departamento</label>
              <select
                required
                value={cargo.departamento?.id || ""}
                name="departamento"
                id="departamento"
                className='resize-none w-full rounded-sm border-border bg-white px-3 py-2 text-md placeholder:text-muted-foreground text-text border-2 focus:outline-none focus:ring-2 focus:ring-primary'
                onChange={atualizarDepartamento}
              >
                <option value="" disabled>Selecione um departamento</option>
                {listaDepartamentos.map((departamento) => (
                  <option key={departamento.id} value={departamento.id}>
                    {departamento.nome}
                  </option>
                ))}
              </select>

            </div>

            <button
              className="rounded text-slate-100 bg-indigo-400 
                                hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
              type="submit">
              {isLoading ?
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                /> :
                <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
              }
            </button>
            <Link to="/home" className="rounded text-slate-100 bg-gray-800 hover:bg-gray-900 w-1/2 py-2 mx-auto flex justify-center">Cancelar</Link>
          </div>
        </form>
      </div>
      <img src={colbgright} alt="decorativo" className="sticky top-0 h-screen" />
    </div>
  )
}
