import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
import { FaUserTie, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function retornar() {
    handleLogout();
    navigate("/login");
    setIsMenuOpen(false); // Fecha o menu ao deslogar
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen); // Alterna o estado do menu
  }

  return (
    <nav className="bg-white w-full z-50 border-b border-rh-secondarygrey dark:border-rh-secondarygrey shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3 md:p-4">
        <Link to="/home" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <img src={Logo} className="h-7 md:h-9" alt="Logo da Empresa" />
        </Link>

        <div className="flex items-center md:order-2 space-x-2 md:space-x-4">
          {/* Bloco de botões para usuário logado */}
          {usuario.token !== "" ? (
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="flex p-1 gap-1 items-center relative overflow-hidden group text-rh-primarygrey hover:text-gray-800 transition-colors">
                <FaUserTie className="text-xl md:text-2xl" />
                <Link to="/perfil" className="font-medium text-sm md:text-base" onClick={() => setIsMenuOpen(false)}>
                  Perfil
                </Link>
                {/* Linha de hover/focus para Perfil */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rh-primarygrey transition-all duration-300 group-hover:w-full group-focus-within:w-full"></span>
              </button>

              <button
                onClick={retornar}
                type="button"
                className="text-white bg-rh-primarygrey hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-3 py-1.5 md:px-4 md:py-2 text-center transition duration-300 ease-in-out"
              >
                Sair
              </button>
            </div>
          ) : null}
          {/* Bloco de botões para usuário deslogado */}
          {usuario.token === "" ? (
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link
                to="/login"
                type="button"
                className="text-white bg-rh-primarygrey hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-3 py-1.5 md:px-4 md:py-2 text-center transition duration-300 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
              <Link
                to="/cadastro"
                type="button"
                className="text-white bg-rh-primarygrey hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-md text-sm px-3 py-1.5 md:px-4 md:py-2 text-center transition duration-300 ease-in-out"
                onClick={() => setIsMenuOpen(false)}
              >
                Cadastrar
              </Link>
            </div>
          ) : null}

          {/* Botão do Menu Hamburguer (visível apenas em mobile) */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">
              {isMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
            </span>
            {isMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Overlay para fechar o menu ao clicar fora (visível apenas em mobile quando o menu está aberto) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Itens do Menu de Navegação */}
        <div
          className={`
            fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 pt-16
            transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            z-[51]
            md:relative md:top-auto md:right-auto md:h-auto md:w-auto
            md:flex md:flex-row md:items-center md:justify-between
            md:bg-transparent md:shadow-none md:p-0 md:transform-none
            md:order-1
            ${isMenuOpen ? 'flex' : 'hidden'} md:flex
          `}
          id="navbar-sticky"
        >
          {/* Ajuste o tamanho da fonte para desktop aqui no UL */}
          <ul className="flex flex-col gap-4 text-base font-medium w-full md:flex-row md:gap-8 md:text-lg md:w-auto"> {/* ALTERADO: md:text-lg */}
            {/* Link Home (visível se logado) */}
            {usuario.token !== "" ? (
              <li className="relative overflow-hidden group">
                <Link
                  to="/home"
                  className="block py-2 px-3 text-rh-primarygrey rounded-sm transition-colors md:p-0
                            hover:text-gray-800 focus:text-gray-800 active:text-gray-800" /* Adicionado focus e active */
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rh-primarygrey transition-all duration-300
                            group-hover:w-full group-focus-within:w-full"></span> {/* Adicionado group-focus-within */}
              </li>
            ) : null}

            {/* Link Sobre */}
            <li className="relative overflow-hidden group">
              <Link
                to="/sobre"
                className="block py-2 px-3 text-rh-primarygrey rounded-sm transition-colors md:p-0
                            hover:text-gray-800 focus:text-gray-800 active:text-gray-800" /* Adicionado focus e active */
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rh-primarygrey transition-all duration-300
                            group-hover:w-full group-focus-within:w-full"></span> {/* Adicionado group-focus-within */}
            </li>
            {/* Link Futuro */}
            <li className="relative overflow-hidden group">
              <Link
                to="/features-futuras"
                className="block py-2 px-3 text-rh-primarygrey rounded-sm transition-colors md:p-0
                            hover:text-gray-800 focus:text-gray-800 active:text-gray-800" /* Adicionado focus e active */
                onClick={() => setIsMenuOpen(false)}
              >
                Futuro
              </Link>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rh-primarygrey transition-all duration-300
                            group-hover:w-full group-focus-within:w-full"></span> {/* Adicionado group-focus-within */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;