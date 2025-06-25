import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import ColunaEsquerda from "../../assets/img/ColunaEsquerda.png"
import ColunaDireita from "../../assets/img/ColunaDireita.png"
import Departamento from "../../models/Departamento";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { atualizar, buscar, cadastrar } from "../../services/Service";

function FormDepartamento() {

  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState<Departamento>(
    {} as Departamento
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout, isAuthLoading } = useContext(AuthContext);
  const token = usuario?.token;
  const [mostrarModal, setMostrarModal] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthLoading) {
      if (!token) {
        ToastAlerta('Você precisa estar logado!', 'info')
        navigate('/')
      } else {
        if (id !== undefined) {
          buscar(`/departamento/${id}`, (data: Departamento) => {
            const numeroAndar = parseInt(data.andar); // remove o "° Andar"
            setDepartamento({ ...data, andar: numeroAndar.toString() });
          }, {
            headers: { Authorization: token },
          });
        }
        setLoadingPage(false);
      }
    }
  }, [token]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setDepartamento({
      ...departamento,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/departamentos");
  }

  async function gerarNovoDepartamento(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    console.log("ID do departamento:", id);




    if (id !== undefined) {
      try {
        const departamentoCorreto = {
          ...departamento,
          andar: `${parseInt(departamento.andar)}° Andar`,
        }
        await atualizar(`/departamento`, departamentoCorreto, setDepartamento, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Departamento foi atualizado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Departamento.", "erro");
        }
      }
    } else {
      try {
        const departamentoCorreto = {
          ...departamento,
          andar: `${departamento.andar}° Andar`,
        }
        await cadastrar(`/departamento`, departamentoCorreto, setDepartamento, {
          headers: { Authorization: token },
        });
        ToastAlerta("O Departamento foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Departamento.", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

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

  return (

    <>
      <div className="flex min-h-screen relative justify-between">
        <img className="sticky h-screen hidden md:block w-auto " src={ColunaEsquerda} alt="Coluna Esquerda" />
        <div className="md:w-[500px] flex flex-col gap-4 p-4 sm:p-6 md:p-8 w-full sm:w-2/3 mx-auto">

          <h1 className="text-2xl sm:text-3xl text-wrap md:text-4xl text-center my-4 sm:my-6 md:my-8 text-rh-primarygrey">
            {id === undefined
              ? "Cadastrar Departamento"
              : "Editar Departamento"}
          </h1>
          {/* aqui eu deixei um padding de 6 para ajustar o tamanho dos campos do forms */}
          <form
            className="flex flex-col gap-2 px-6"
            onSubmit={gerarNovoDepartamento}
          >
            <div className="flex flex-col gap-2">
              <label className="text-rh-primarygrey text-sm sm:text-base" htmlFor="nome">Nome do Departamento</label>
              <input
                type="text"
                placeholder="Escreva o nome do Departamento"
                name="nome"
                className="w-full p-2 sm:p-3 rounded border-2 border-rh-primarygrey 
                           focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple 
                           outline-none text-base sm:text-lg"
                value={departamento.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />

              <label className="text-rh-primarygrey text-sm sm:text-base" htmlFor="andar">Andar</label>
              <input
                type="number"
                placeholder="Digite o numero do andar do Departamento"
                name="andar"
                className="w-full p-2 sm:p-3 rounded border-2 border-rh-primarygrey 
                           focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple 
                           outline-none text-base sm:text-lg"
                value={departamento.andar}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
              <label className="text-rh-primarygrey text-sm sm:text-base" htmlFor="ramal">Ramal</label>
              <input
                type="text"
                placeholder="Por Ex: 123"
                name="ramal"
                className="w-full p-2 sm:p-3 rounded border-2 border-rh-primarygrey 
                           focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple 
                           outline-none text-base sm:text-lg"
                value={departamento.ramal}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />

              <label className="text-rh-primarygrey text-sm sm:text-base" htmlFor="descricao">Descrição do Departamento</label>
              <textarea

                placeholder="Descreva aqui seu Departamento"
                name="descricao"
                className="resize-none h-20 sm:h-24 w-full p-2 sm:p-3 rounded border-2 border-rh-primarygrey 
                           focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple 
                           outline-none text-base sm:text-lg"
                value={departamento.descricao}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  atualizarEstado(e)
                }
              />

            </div>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 sm:gap-6 pt-4 pb-4 sm:pb-6">
              <button onClick={() => setMostrarModal(true)}
                className="rounded text-slate-100 bg-rh-primarypurple transition-colors duration-500
               hover:bg-rh-secondarypurple w-full sm:w-[calc(50%-0.75rem)] py-2 sm:py-3 
               flex items-center justify-center text-base sm:text-lg"
                type="submit"
              >
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

              <Link to="/departamentos"
                className="rounded text-slate-100 bg-rh-primarygrey
               transition-colors hover:bg-rh-secondaryblue duration-500 
               w-full sm:w-[calc(50%-0.75rem)] py-2 sm:py-3 
               flex items-center justify-center text-base sm:text-lg"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        <img className="sticky h-screen hidden md:block w-auto" src={ColunaDireita} alt="Coluna Direita" />

      </div>
    </>
  );
}

export default FormDepartamento;
