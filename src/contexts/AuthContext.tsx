import { createContext, type ReactNode, useEffect, useState } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"


interface AuthContextProps {
    usuario: UsuarioLogin | null
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioLogin | null>>
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login(`/usuario/logar`, usuarioLogin, (userData: UsuarioLogin) => {
                setUsuario(userData);
                localStorage.setItem("@AppAuth:usuario", JSON.stringify(userData));
            })
            //Buscar cargo e injetar no token por padrão
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario(null)
        localStorage.removeItem("@AppAuth:usuario");
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("@AppAuth:usuario");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, setUsuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}