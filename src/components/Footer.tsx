import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Logo from '../assets/img/Logo.png'
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {

    return (

        <div className=" bg-white border-t border-rh-secondarygrey py-6 px-4 w-full mx-auto flex flex-col md:flex-row justify-between md:items-start items-center gap-6 md:gap-8 text-sm text-rh-secondarygrey">
            <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4 md:mb-0">
                <img src={Logo} className="w-28 md:w-32 h-auto" alt="Logo Rh Corp" />
                <p className="text-xs mt-2 max-w-xs">Cuidando de quem faz a sua empresa.</p>
            </div>
            <div className="text-center mb-4 md:mb-0">
                <a
                    href="https://github.com/Aplicativo-Sistema-de-RH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-rh-primarygrey justify-center space-x-2 hover:text-rh-secondarygrey transition-colors ext-base md:text-lg"
                >
                    <FaGithub className="text-xl md:text-2xl" />
                    <span>Acesse o repositório no GitHub.</span>
                </a>
                <p className="text-xs mt-2 max-w-xs">Em parceria com Generation Brasil.</p>
            </div>
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2 text-base">
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/sobre" className="hover:underline">Sobre Nós</Link>
                <Link to="/contato" className="hover:underline">Fale Conosco</Link>
            </div>

        </div>

    );
};

export default Footer;
