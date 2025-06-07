import { useNavigate } from "react-router-dom";
import CardCargo from "./CardCargo";
import Cargo from "../models/Cargo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { buscar } from "../services/Service";
import { ToastAlerta } from "../utils/ToastAlerta";

export default function ListaCargo() {
  const listaCargos = [
    {
      id: 1,
      nome: "teste3",
      nivel: "Junior",
      descricao: "Teste Teste",
      salario: 2400,
    },
    {
      id: 2,
      nome: "teste3",
      nivel: "Junior",
      descricao: "Teste Teste",
      salario: 2400,
    }
  ]

  // const navigate = useNavigate();

  // const [listaCargos, setListaCargos] = useState<Cargo[]>([])

  // const { usuario, handleLogout } = useContext(AuthContext)
  // const token = usuario.token

  // async function buscarCargos() {
  //   try {
  //     // await buscar('/cargo', setListaCargos, {
  //     //   headers: { Authorization: token }
  //     // })
  //   } catch (error: any) {
  //     if (error.toString().includes('403')) {
  //       handleLogout()
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (token === '') {
  //     ToastAlerta('Você precisa estar logado!', 'info')
  //     navigate('/')
  //   }
  // }, [token])

  // useEffect(() => {
  //   buscarCargos()
  // }, [listaCargos.length])

  return (
    <>
      {
        listaCargos.map((cargo) => (
          <CardCargo key={cargo.id} cargo={cargo} />
        ))
      }
    </>
  )
}
