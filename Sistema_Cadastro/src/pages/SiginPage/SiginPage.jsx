import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './SiginPage.css';

function SiginPage() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [senha, setSenha] = useState('');

    function notificacao() {
        toast.success('Cadastrado com sucesso!', {
            hideProgressBar:true,
            onClose: () => {
                setTimeout(() => {
                    navigate('/');
                }, 3000); 
            }
            });
    }
    

    async function bodyLogin() {
        if (!nome || !email || !senha) {
            setError('Preencha todos os campos');
            return;
        } else {
            try {
                const resposta = await axios.post('http://localhost:3000/api/usuarios/cadastro', {nome, email, senha});
                console.log('Usuário inserido com sucesso:', resposta.data);
                if (resposta.data) {
                    notificacao();
                } 
            } catch (error) {
                console.log('Erro ao inserir usuário:', error);
                if (error.response && error.response.data && error.response.data.msg) {
                    setError(error.response.data.msg);
                } else {
                    setError('Erro ao cadastrar usuário');
                }
            }
        }
    }
    
    return (
        <div className="container">
            <ToastContainer autoClose={false}/>
            <h2 className="label">Registra-se já!</h2>
            <div className="content">
                <Input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => [setNome(e.target.value), setError('')]}
                />
                <Input
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError('')]}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError('')]}
                />
                <label className="labelError">{error}</label>
                <Button onClick={bodyLogin} type="button" Text="Registrar" />
                <label className="labelSignup">
                    Não tem uma conta?
                    <strong>
                        <Link to="/signup">&nbsp;Registre-se</Link>
                    </strong>
                </label>
            </div>
        </div>
    );
}

export default SiginPage;
