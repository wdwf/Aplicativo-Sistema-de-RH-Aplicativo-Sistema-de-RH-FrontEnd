import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Hourglass, RotatingLines } from "react-loader-spinner";
import colbgleft from "../../assets/img/colbgleft.png";
import colbgright from "../../assets/img/colbgright.png";
import Departamento from "../../models/Departamento";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import Cargo from "../../models/Cargo";

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

  const { usuario, handleLogout, isAuthLoading } = useContext(AuthContext)
  const token = usuario?.token
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
    navigate("/cargos")
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
    window.scrollTo(0, 0);
    if (!isAuthLoading) {
      if (!token) {
        ToastAlerta('Você precisa estar logado!', 'info')
        navigate('/')
      }
      else {
        buscarDepartamentos()
        if (id !== undefined) {
          buscarPorId(id)
        }
        setLoadingPage(false);
      }
    }
  }, [isAuthLoading, token, id])


  if (isAuthLoading) {
    return <div className="flex justify-center items-center h-screen w-full">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="80"
        visible={true}
      />
    </div>;
  }

  if (!usuario?.token) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative md:justify-between items-center md:items-start overflow-hidden">
      <img src={colbgleft} alt="decorativo" className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0" />

      <div className="flex items-center flex-col gap-4 p-4 py-8 md:py-4 w-full max-w-lg mx-auto md:max-w-xl lg:max-w-2xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-800 my-2 text-center">
          {id === undefined ? 'Cadastrar Cargo' : 'Atualizando Cargo'}
        </h2>

        <form className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg" onSubmit={gerarNovoCargo}>
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nome" className="w-full pl-3 text-sm md:text-base lg:text-lg font-normal text-gray-700">Nome do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base md:text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="text"
                placeholder="Escreva o nome do Cargo"
                name='nome'
                value={cargo.nome}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="nivel" className="w-full pl-3 text-sm md:text-base lg:text-lg font-normal text-gray-700">Nivel do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base md:text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="text"
                placeholder="Ex: Estagiário, Junior, Pleno, Sênior... "
                name='nivel'
                value={cargo.nivel}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="salario" className="w-full pl-3 text-sm md:text-base lg:text-lg font-normal text-gray-700">Salario Bruto do Cargo</label>
              <input
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base md:text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
                type="number"
                placeholder="Escreva o valor do salário"
                name='salario'
                value={cargo.salario}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
            <div>
              <label htmlFor="descricao" className="w-full pl-3 text-sm md:text-base lg:text-lg font-normal text-gray-700">Descrição do Cargo</label>
              <textarea
                name='descricao'
                placeholder="..."
                className="w-full resize-y rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base md:text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200 min-h-[100px] md:min-h-[120px] lg:min-h-[150px]"
                id=""
                value={cargo.descricao}
                required
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
              ></textarea>
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="departamento" className="w-full pl-3 text-sm md:text-base lg:text-lg font-normal text-gray-700">Departamento</label>
              <select
                required
                value={cargo.departamento?.id || ""}
                name="departamento"
                id="departamento"
                className="w-full rounded-sm text-rh-primarygrey border bg-white px-3 py-2 text-base md:text-lg lg:text-xl placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-rh-primaryblue disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200"
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
            <div className='flex flex-col sm:flex-row gap-2 mt-6'>
              <button
                className="flex justify-center items-center w-full cursor-pointer rounded-sm border-none px-3 py-2 font-medium 
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
                           disabled:cursor-not-allowed disabled:opacity-50 
                           text-rh-primary-white bg-rh-primaryblue hover:bg-rh-secondaryblue 
                           transition-colors duration-300 text-base md:text-lg lg:text-xl"
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
              <Link to="/cargos" className="rounded text-slate-100 bg-gray-800 hover:bg-gray-900 w-full py-2 mx-auto flex justify-center text-center 
                                           transition-colors duration-300 text-base md:text-lg lg:text-xl">Cancelar</Link>
            </div>
          </div>
        </form>
      </div>

      <img src={colbgright} alt="decorativo" className="hidden md:block sticky top-0 h-screen w-auto object-cover flex-shrink-0" />
    </div>
  )
}
