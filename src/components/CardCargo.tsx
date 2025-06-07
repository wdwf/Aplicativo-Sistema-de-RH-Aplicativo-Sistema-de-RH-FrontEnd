import Cargo from "../models/Cargo"

interface CardCargoProps {
  cargo: Cargo;
}

export default function CardCargo({ cargo }: CardCargoProps) {
  return (
    <article style={{ border: "solid 1px" }}>
      <div>
        <h2>Cargo</h2>
        <p>{cargo.nome}</p>
      </div>
      <div>
        <span>Nivel</span>
        <p>{cargo.nivel}</p>
      </div>
      <div>
        <span>Salario</span>
        <p>{cargo.salario}</p>
      </div>
      <div>
        <span>Descrição</span>
        <p>{cargo.descricao}</p>
      </div>
    </article>
  )
}
