import Banner from '../../assets/img/Banner.png';
import BtnDep from '../../assets/img/btn1.png';
import BtnCar from '../../assets/img/btn2.png';
import BtnCal from '../../assets/img/btn3.png';
import BtnListCargo from '../../assets/img/btn4.png';
import BtnListDep from '../../assets/img/btn5.png';
import BtnListTable from '../../assets/img/btn4.png';
import { Link, useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import Usuario from '../../models/Usuario';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Home() {

    window.scrollTo(0, 0);
    const navigate = useNavigate();

    const { usuario, setUsuario, handleLogout } = useContext(AuthContext);
    const [usuarioData, setUsuarioData] = useState<Usuario>({} as Usuario);

    async function buscarUserPorId(id: string) {
        try {
            await buscar(
                `/usuario/${id}`, setUsuarioData,
                {
                    headers: {
                        Authorization: usuario?.token,
                    },
                }
            );
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }


    useEffect(() => {
        if (!usuario?.token) {
            ToastAlerta("Você precisa estar Logado!", "info");
            navigate("/");
        } else {
            if (usuario?.id) {
                buscarUserPorId(String(usuario?.id))
            }
        }
    }, [usuario?.token]);

    if (!usuario?.token) {
        return (
            <h1>Carregando...</h1>
        )
    }

    return (

        <>
            <div className="pt-6 pb-9">
                <div className="rounded bg-rh-primary-50 w-full flex flex-col md:flex-row justify-between items-center px-6 py-3">
                    <div className='flex flex-col gap-2'>
                        <p className="text-4xl font-semibold text-rh-primarygrey">Potencialize seu time.</p>
                        <p className="text-4xl font-semibold text-rh-primarygrey">Construa futuros.</p>
                        <span className="font-extralight text-md text-rh-primarygrey">#rhcorp</span>
                    </div>
                    <img src={Banner} alt="banner" className='w-2/4' />
                </div>

                <div className='flex flex-col gap-4 px-6'>
                    <h3 className='text-3xl font-medium py-2.5 text-rh-primarygrey'>
                        Funcionalidades
                    </h3>
                    <div className='flex flex-wrap gap-4 md:justify-center'>
                        <Link to="/cadastrar-cargo"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                            style={{ backgroundImage: `url(${BtnDep})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cadastrar</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cargo</p>
                            <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                        </Link>
                        <Link to="/cadastrar-departamento"
                            className={`w-full max-w-[420px] h-[200px] bg-cover  bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                            style={{ backgroundImage: `url(${BtnCar})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cadastrar</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Departamento</p>
                            <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                        </Link>
                        <Link to="/calcular-salario"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                            style={{ backgroundImage: `url(${BtnCal})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Calcular</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Salario</p>
                            <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                        </Link>
                    </div>
                </div>
                <div className='flex gap-4 px-6 mt-6 flex-wrap justify-center'>
                    <Link to="/cargos"
                        className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                        style={{ backgroundImage: `url(${BtnDep})` }}
                    >
                        <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Listar</p>
                        <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cargo</p>
                        <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                    </Link>
                    <Link to="/departamentos"
                        className={`w-full max-w-[420px] h-[200px] bg-cover  bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                        style={{ backgroundImage: `url(${BtnCar})` }}
                    >
                        <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Listar</p>
                        <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Departamento</p>
                        <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                    </Link>


                    {
                        usuarioData.cargo?.nome === "Recursos Humanos" &&
                        <Link to="/gerenciar-perfis"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out`}
                            style={{ backgroundImage: `url(${BtnCal})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Gerenciar</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Perfis</p>
                            <FaArrowRight width={25} height={25} className='text-rh-primary-white w-7 h-7 mt-2' />
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}
export default Home