import { Link, useNavigate } from "react-router"
import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from 'react-loader-spinner';
import UsuarioLogin from "../../models/UsuarioLogin";
import Logo from "../../assets/img/Logo.png"
import Bg from "../../assets/img/Bg.png"
import Bg2 from "../../assets/img/Bg2.png"

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )

    useEffect(() => {
        if (usuario?.token) {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (

        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center py-8 px-4 md:py-12">
                <div className="w-full max-w-md">
                    <div className="flex flex-col mb-4 items-center">
                        <img src={Logo} alt="Logo Fitlab" className="h-12 md:h-16 mb-2" />
                    </div>


                    <h1 className="text-rh-primarygrey text-3xl md:text-4xl text-center mb-2 ">Acesse a Plataforma</h1>
                    <p className="text-rh-secondarygrey text-sm md:text-xs text-center mb-6">Gerenciando sabiamente o bem mais valioso de uma empresa.</p>

                    <form className="space-y-4" onSubmit={login}>
                        <div>
                            <label className="block text-text mb-1" htmlFor="usuario">E-mail</label>
                            <input
                                type="email"
                                id="usuario"
                                name="usuario"
                                placeholder="Exemplo@email.com"
                                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div>
                            <label className="block text-text mb-1" htmlFor="senha">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="********"
                                className="w-full px-4 py-2 text-shadow-rh-primarygrey border border-rh-primarygrey rounded focus:outline-none focus:ring-2 focus:ring-rh-primarygrey"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-rh-primarygrey text-white font-semibold hover:bg-rh-secondaryblue py-2 rounded transition cursor-pointer flex justify-center items-center">
                            {isLoading ? <RotatingLines
                                strokeColor="grey"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                                <span>Entrar</span>
                            }
                        </button>

                        <p className="text-center text-text-tertiary mt-6">
                            Não tem uma conta?{" "}
                            <Link to="/cadastro" className="text-black font-semibold hover:underline inline-flex items-center gap-1">
                                Cadastrar <span>→</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className="hidden md:flex md:w-1/2 relative items-end justify-center px-1 overflow-hidden group ">
                <img
                    src={Bg}
                    alt="Imagem normal"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                />
                <img
                    src={Bg2}
                    alt="Imagem hover"
                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
            </div>
        </div>
    )
}

export default Login;