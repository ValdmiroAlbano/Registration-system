import {createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (Children) =>{
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState();

    useEffect(()=>{
        const userToken = localStorage.getItem("user_token");
        const userStrage = localStorage.getItem("user_db");

        if(userToken && userStrage){
            const hasUser = JSON.parse(userStrage)?.filter(
                (user) => user.senha === JSON.parse(userToken).senha 
            );
        if(hasUser) setUser(hasUser[0]);
        }
    },[]);

    function signin(nome, senha){
        const userStrage = JSON.parse(localStorage.getItem("user_db"));

        const hasUser = userStrage?.filter((user) => user.nome === nome);
    
        if(hasUser?.length){
            if (hasUser[0].nome === nome && hasUser[0].senha === senha) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({nome, token}));
                setUser({nome, senha});
                return;
            }else{
                return "E-mail ou senha incorreta";
            }
        }else {
            return "Usuario não cadastrado";
        }
    } 

    function signup(nome, email, senha) {

        const userStrage = JSON.parse(localStorage.getItem("user_db"));

        const hasUser = userStrage?.filter((user)=> user.nome === nome);

        if(hasUser?.length){
            return "Já tem uma conta com esse nome";
        }

        let novoUsuario;

        if(userStrage){
            novoUsuario = [...userStrage, {nome, email, senha}];
        }else{
            novoUsuario = [{nome, email, senha}];
        }
        localStorage.setItem("user_db", JSON.stringify(novoUsuario));

        return;
    }

    function signout() {
        setUser(null);
        localStorage.removeItem("user_token")
    }
    
    return <AuthContext.Provider
    value={{user, signed: !!user, signin, signup, signout}}
    >{Children}</AuthContext.Provider>
};  