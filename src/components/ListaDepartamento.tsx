/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Departamento from "../models/Departamento";
import { buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";
import { DNA, RotatingLines } from "react-loader-spinner";
import CardDepartamento from "./CardDepartamento";

function ListaDepartamento() {
 const navigate = useNavigate();
 
 const [departamento, setDepartamento] = useState<Departamento[]>([]);
 const [isLoading, setIsLoading] = useState<boolean>(false)
 const [isLoadinPage, setIsLoadingPage] = useState<boolean>(true)
 
 const { usuario, handleLogout } = useContext(AuthContext)
 const token = usuario.token

  async function buscarDepartamento() {
    try {
      await buscar("/departamento", setDepartamento, {
        headers: { Authorization: token },
      });
      setIsLoadingPage(false)
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

 useEffect (() => {
         if(token === ''){
             return
         }
         if(!token){
         ToastAlerta("Você precisa estar Logado!","info")
         handleLogout();
         navigate("/")
         }else{
          buscarDepartamento()
        
         }
        }, [token])


if (isLoadinPage) {
    return <RotatingLines
      strokeColor="black"
      strokeWidth="5"
      animationDuration="0.75"
      width="24"
      visible={true}
    />
  }



  return (
  
  <>

            {departamento.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8">
                        {departamento.map((departamento) => (<CardDepartamento key={departamento.id} departamento={departamento} />))}

                    </div>
                </div>
            </div>
        </>


  )
}

export default ListaDepartamento;
