import { Link } from "react-router"
import Logo from "../assets/img/Logo.png"
import JF from "../assets/img/JF.png"
function Footer() {
     let data = new Date().getFullYear()
  return (
    <>
        <div className="flex justify-center items-center gap-3 bg-white py-2 border-t border-gray-300">
            <Link to="/home" className="flex items-center space-x-2">
                <img src={Logo} className="min-w-[100px] w-24 min-h-8 px-2" alt="Logo Fit Lab" />
            </Link>
            <h6 className="font-family font-sans text-text-tertiary text-sm">em parceria com</h6>
            <Link to={"https://github.com/Aplicativo-Sistema-de-RH"}>
                <img src={JF} className="min-w-[100px] w-24 min-h-8 px-2" alt="Logo Fit Lab" />
            </Link>
        </div>
        <div className="text-center text-pretty text-sm min-h-0.5">
                <p>Copyright: {data}</p>
        </div>
    </>
  )
}
export default Footer