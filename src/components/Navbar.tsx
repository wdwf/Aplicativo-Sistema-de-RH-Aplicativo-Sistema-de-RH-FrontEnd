import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/Logo.png";
import { FaUserTie } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { usuario, handleLogout, isAuthLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function retornar() {
    handleLogout();
    navigate("/login");
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isAuthLoading && !usuario?.token) {
      navigate("/");
    }
  }, [isAuthLoading, usuario?.token]);

  const handleMenuClick = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white w-full z-20 border-b border-rh-secondarygrey dark:border-rh-secondarygrey">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" onClick={handleMenuClick}>
          <img src={Logo} className="h-8" alt="Logo" />
        </Link>

        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>



        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto mt-4 md:mt-0`} id="navbar-sticky">
          <ul className="flex flex-col md:flex-row items-start md:items-center md:space-x-8 bg-white p-4 md:p-0 border md:border-0 border-gray-200 rounded-lg">
            {!!usuario?.token && (
              <li>
                <Link to="/home" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Home</Link>
              </li>
            )}
            <li>
              <Link to="/sobre" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Sobre</Link>
            </li>
            <li>
              <Link to="/features-futuras" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Futuro</Link>
            </li>
            <li className="md:hidden">
              {!!usuario?.token ? (
                <>
                  <Link to="/perfil" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Perfil</Link>
                  <button onClick={retornar} className="w-full text-left text-red-600 hover:text-red-700 py-2 px-3">Sair</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Entrar</Link>
                  <Link to="/cadastro" onClick={handleMenuClick} className="block py-2 px-3 text-rh-primarygrey hover:underline">Cadastrar</Link>
                </>
              )}
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          {!!usuario?.token ? (
            <div className="flex items-center space-x-4">
              <Link to="/perfil" className="flex items-center gap-1 text-rh-primarygrey hover:underline">
                <FaUserTie /> Perfil
              </Link>
              <button onClick={retornar} className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">Sair</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-white bg-rh-primarygrey hover:bg-rh-secondaryblue px-4 py-2 rounded text-sm">Entrar</Link>
              <Link to="/cadastro" className="text-white bg-rh-primarygrey hover:bg-rh-secondaryblue px-4 py-2 rounded text-sm">Cadastrar</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
