import { Link } from "react-router-dom"
import Logo from "../assets/img/Logo.png"

function Navbar(){
    return (
      
    <nav className="bg-white dark:bg-rh-primarygrey fixed w-full z-20 border-b border-rh-secondarygrey  dark:border-rh-secondarygrey">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       <Link to="/home">
    <img src={Logo} className="h-8 flex items-center space-x-3 rtl:space-x-reverse" alt="Flowbite Logo"/>
    </Link>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="text-white bg-rh-primarygrey hover:bg-rh-secondaryblue focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 text-center dark:hover:bg-blue-800 dark:focus:ring-blue-800">Logar</button>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
        <li className="relative overflow-hidden group">
            <a href="#" className="block py-2 px-3 text-rh-primarygrey rounded-sm hover:bg-white md:p-0">Perfil</a>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-rh-primarygrey transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative overflow-hidden group">
            <a href="#" className="block py-2 px-3 text-rh-primarygrey rounded-sm hover:bg-white md:p-0">Cargos</a>
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-rh-primarygrey transition-all duration-300 group-hover:w-full"></span>
        </li>
        <li className="relative overflow-hidden group">
            <a href="#" className="block py-2 px-3 text-rh-primarygrey rounded-sm hover:bg-white md:p-0">Departamentos</a>
             <span className="absolute bottom-0 left-0 w-0 h-1 bg-rh-primarygrey transition-all duration-300 group-hover:w-full"></span>
        </li>
        </ul>
    </div>
    </div>
    </nav>

    )
}
export default Navbar