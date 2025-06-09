/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Departamento from "../models/Departamento";
import { AuthContext } from "../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import ColunaEsquerda from "../assets/img/ColunaEsquerda.png"
import ColunaDireita from "../assets/img/ColunaDireita.png"

function FormDepartamento() {
  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState<Departamento>(
    {} as Departamento
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [mostrarModal, setMostrarModal] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (token === "") {
      return;
    }
    if (!token) {
      ToastAlerta("Você precisa estar Logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscar(`/departamento/${id}`, setDepartamento, {
        headers: { Authorization: token },
      });
      setLoadingPage(false);
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

    if (id !== undefined) {
      try {
        await atualizar(`/departamento`, departamento, setDepartamento, {
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
        await cadastrar(`/departamento`, departamento, setDepartamento, {
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

  if (loadingPage) {
    return (
      <RotatingLines
        strokeColor="black"
        strokeWidth="5"
        animationDuration="0.75"
        width="24"
        visible={true}
      />
    );
  }


  return (
    <>






      <div className="flex min-h-screen relative justify-between">
        <img className="sticky h-screen " src={ColunaEsquerda} alt="Coluna Esquerda" />
        <div className="flex flex-col gap-4 p-4">

          <h1 className="text-4xl text-center my-8 text-rh-primaryblue">
            {id === undefined
              ? "Cadastrar Departamento"
              : "Editar Departamento"}
          </h1>

          <form
            className="flex flex-col gap-4 "
            onSubmit={gerarNovoDepartamento}
          >
            <div className="flex flex-col gap-2 focus:ring-2 ">
              <label className="text-rh-secondaryblue" htmlFor="nome">Nome do Departamento</label>
              <input
                type="text"
                placeholder="Escreva o nome do Departamento"
                name="nome"
                className="w-full p-2 rounded border-2 border-rh-primarygrey focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple outline-none text-shadow-rh-primarygrey"
                value={departamento.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />

              <label className="text-rh-secondaryblue" htmlFor="andar">Andar</label>
              <input
                type="text"
                placeholder="Ex... 1º Andar"
                name="andar"
                className="w-full p-2 rounded border-2 border-rh-primarygrey focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple outline-none text-shadow-rh-primarygrey"
                value={departamento.andar}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
              <label className="text-rh-secondaryblue" htmlFor="ramal">Ramal</label>
              <input
                type="text"
                placeholder="Por Ex: 123"
                name="ramal"
                className="w-full p-2 rounded border-2 border-rh-primarygrey focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple outline-none text-shadow-rh-primarygrey"
                value={departamento.ramal}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />

              <label className="text-rh-secondaryblue" htmlFor="descricao">Descrição do Departamento</label>
              <textarea

                placeholder="Descreva aqui seu Departamento"
                name="descricao"
                className="resize-none h-20 w-full p-2 rounded border-2 border-rh-primarygrey focus:border-rh-primarypurple focus:ring-2 focus:ring-rh-primarypurple outline-none text-shadow-rh-primarygrey"
                value={departamento.descricao}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  atualizarEstado(e)
                }
              />



            </div>
            <div className="flex justify-between pb-[20px] pt-[10px]">
              <button onClick={() => setMostrarModal(true)}
                className="rounded text-slate-100 bg-rh-primarypurple transition-colors duration-500
                                    hover:bg-rh-secondarypurple w-[150px] py-2  flex justify-center"
                type="submit"
              >
                {isLoading ? (
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                )}
              </button>




              <Link to="/home"
                className="rounded text-slate-100 bg-rh-primarygrey
                                    transition-colors hover:bg-rh-secondaryblue duration-500 w-[150px] py-2  flex justify-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        <img className="sticky h-screen" src={ColunaDireita} alt="Coluna Direita" />

      </div>
    </>
  );
}

export default FormDepartamento;
