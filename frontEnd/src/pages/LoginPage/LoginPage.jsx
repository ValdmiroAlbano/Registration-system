import { Link, useNavigate } from 'react-router-dom';
import { useState} from "react";
import Button from '../../components/Button/Button'
import axios from 'axios'
import Input from '../../components/Input/Input';


import "./LoginPage.css"

function LoginPage(){

    const [token, setToken] = useState(localStorage.getItem('token'));
    const navegate = useNavigate();
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] =useState('');

    async function bodyLogin() {
      if (!nome.trim() || !senha.trim()) {
          setError('Preencha todos os campos!'); 
          return;
      } else {
          try {
              const resposta = await axios.post('http://localhost:3000/api/usuarios/login', { nome, senha });
              console.log('Usuário Logado!:', resposta.data);

              const novoToken = resposta.data.token;
              localStorage.setItem('token', novoToken);
              setToken(novoToken);

              setTimeout(() => {
                  navegate('/operacao');
              }, 1000);
  
          } catch (err) {
              console.log('Erro na requisição de login', err);
              if (err.response && err.response.data && err.response.data.msg) {
                  setError(err.response.data.msg);
              } else {
                  setError('Erro ao fazer login');
              }
          }
      }

  }
  
    
    return(
        <div className='container'>
            <label className='label'>Login</label>
            <div className='content'>
                <Input 
                  type="text"
                  placeholder="Digite o seu nome"
                  value={nome}
                  onChange={(e)=>[setNome(e.target.value), setError("")]}
                  name="nome"
                  />
                  <Input 
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e)=>[setSenha(e.target.value), setError("")]}
                  name="senha"
                  />
                <label className='labelError'>{error}</label>
                <Button onClick={bodyLogin} type="submit" Text="Entrar" nome = "Registrar"/>
                <label className='labelSignup'>
                    Não tem uma conta?
                    <strong>
                        <Link to={"/signup"}>&nbsp;Registre-se</Link>
                    </strong>
                </label>
            </div>
        </div>
    )
}
export default LoginPage