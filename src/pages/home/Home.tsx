import Banner from '../../assets/img/Banner.png';
import BtnDep from '../../assets/img/btn1.png';
import BtnCar from '../../assets/img/btn2.png';
import BtnCal from '../../assets/img/btn3.png';
import BtnListCargo from '../../assets/img/btn4.png';
import BtnListDep from '../../assets/img/btn5.png';
import ArrowWhite from '../../assets/img/arrow.png';
import ArrowBlack from '../../assets/img/arrowBlack.png';
import { Link } from 'react-router';

function Home() {
    window.scrollTo(0, 0);
    return (
        <>
            <div className="pt-6 pb-9">
                <div className="rounded bg-rh-primary-50 w-full flex justify-between items-center px-6 py-3">
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
                    <div className='flex flex-wrap gap-4'>
                        <Link to="/cadastrar-cargo"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col`}
                            style={{ backgroundImage: `url(${BtnDep})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cadastrar</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cargo</p>
                            <img src={ArrowWhite} alt="Seta" className='mt-2' width={25} />
                        </Link>
                        <Link to="/cadastrar-departamento"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col`}
                            style={{ backgroundImage: `url(${BtnCar})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Cadastrar</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Departamento</p>
                            <img src={ArrowWhite} alt="Seta" className='mt-2' width={25} />
                        </Link>
                        <Link to="/calcular-salario"
                            className={`w-full max-w-[420px] h-[200px] bg-cover bg-center rounded-sm p-6 flex flex-col`}
                            style={{ backgroundImage: `url(${BtnCal})` }}
                        >
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Calcular</p>
                            <p className='text-xl font-semibold text-rh-primary-50 tracking-wide'>Salario</p>
                            <img src={ArrowWhite} alt="Seta" className='mt-2' width={25} />
                        </Link>
                    </div>
                </div>
                <div className='flex gap-4 px-6 mt-6'>
                    <Link to="/cargos" className='hover:bg-blue-100 transition delay-150 duration-300 ease-in-out border flex px-6 justify-between border-rh-secondarygrey rounded w-2xl h-40'>
                        <div className='flex flex-col pt-4'>
                            <p className='text-xl font-semibold text-rh-primarygrey tracking-wide'>Listar</p>
                            <p className='text-xl font-semibold text-rh-primarygray tracking-wide'>Cargos</p>
                            <img src={ArrowBlack} alt="Seta" className='mt-2' width={25} />
                        </div>
                        <img src={BtnListCargo} alt="imagem ilustrativa" className='h-[80%]' />
                    </Link>
                    <Link to="/departamentos" className='hover:bg-purple-100 transition delay-150 duration-300 ease-in-out border flex px-6 justify-between border-rh-secondarygrey rounded w-2xl h-40'>
                        <div className='flex flex-col pt-4'>
                            <p className='text-xl font-semibold text-rh-primarygrey tracking-wide'>Listar</p>
                            <p className='text-xl font-semibold text-rh-primarygray tracking-wide'>Departamento</p>
                            <img src={ArrowBlack} alt="Seta" className='mt-2' width={25} />
                        </div>
                        <img src={BtnListDep} alt="imagem ilustrativa" className='h-[80%]' />
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Home