import { createContext, type ReactNode, useEffect, useState } from "react"

import type UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"
import { ToastAlerta } from "../utils/ToastAlerta"


interface AuthContextProps {
    usuario: UsuarioLogin
    setUsuario: React.Dispatch<React.SetStateAction<UsuarioLogin>>
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {

    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)

        try {
            await login(`/usuario/logar`, usuarioLogin, (userData: UsuarioLogin) => {
                setUsuario(userData);
                localStorage.setItem("@AppAuth:usuario", JSON.stringify(userData));
            })
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        }
        setIsLoading(false)
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
        localStorage.removeItem("@AppAuth:usuario");
    }

    // Carrega dados do localStorage ao iniciar
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