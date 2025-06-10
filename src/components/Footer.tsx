import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Logo from '../assets/img/Logo.png'

const Footer: React.FC = () => {

    return (

        <div className=" bg-white border-t border-rh-secondarygrey py-4 w-full mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-rh-secondarygrey">
            <div className="flex flex-col items-start">
                <img src={Logo} className="min-w-[100px] w-24 min-h-8 py-0.5" alt="Logo Rh Corp" />
                <p className="text-xs mt-1">Cuidando de quem faz a sua empresa.</p>
            </div>
            <div className="text-center">
                <a
                    href="https://github.com/Aplicativo-Sistema-de-RH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-rh-primarygrey justify-center space-x-1 hover:text-rh-secondarygrey transition-colors"
                >
                    <FaGithub />
                    <span>Acesse o repositório no GitHub.</span>
                </a>
                <p className="text-xs mt-1">Em parceria com Generation Brasil.</p>
            </div>
            <div className="flex flex-col text-sm space-y-1 ">
                <a href="#" className="hover:underline">Home</a>
                <a href="#" className="hover:underline">Sobre Nós</a>
                <a href="#" className="hover:underline">Fale Conosco</a>
            </div>

        </div>

    );
};

export default Footer;
