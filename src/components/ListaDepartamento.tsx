/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Departamento from "../models/Departamento";
import { buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { DNA, RotatingLines } from "react-loader-spinner";
import CardDepartamento from "./CardDepartamento";
import arrowBlack from "../assets/img/arrowBlack.png";


function ListaDepartamento() {
  const navigate = useNavigate();

  const [departamento, setDepartamento] = useState<Departamento[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadinPage, setIsLoadingPage] = useState<boolean>(true);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarDepartamento() {
    try {
      await buscar("/departamento", setDepartamento, {
        headers: { Authorization: token },
      });
      setIsLoadingPage(false);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      return;
    }
    if (!token) {
      ToastAlerta("Você precisa estar Logado!", "info");
      handleLogout();
      navigate("/");
    } else {
      buscarDepartamento();
    }
  }, [token]);

  if (isLoadinPage) {
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
    <div className="w-full p-6">
      <div className="flex gap-3 ml-1 my-6 items-center">
        <Link to="/home" className="flex items-center rounded-full gap-2 mb-6 hover:bg-gray-200 p-4 hover:-translate-x-2 transition-all duration-300">
          <img src={arrowBlack} alt="Seta para voltar" className="-scale-x-100" width={24} height={24} />
        </Link>
        <h3 className="text-3xl font-medium text-rh-primarygrey mb-6">
          Lista de Departamentos
        </h3>
      </div>
      <div className="flex flex-wrap gap-4">
        {
          departamento.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <p className="text-xl font-semibold text-rh-primarygrey mt-4">Nenhum cargo cadastrado.</p>
            </div>
          )
        }
        {departamento.map((departamento) => (
          <CardDepartamento
            key={departamento.id}
            departamento={departamento}
          />
        ))}
      </div>
    </div>
  )
}

export default ListaDepartamento;
