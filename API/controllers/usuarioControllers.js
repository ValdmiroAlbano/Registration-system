require('dotenv').config();
const usuarioModel = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UsuarioController{

    constructor(){
        this.usuarioModel = new usuarioModel();
    }

    async criarUsuario(req, res) {
        const { nome, email, senha, nivel_acesso } = req.body;
    
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
    
        
        if (!nome || !email || !senha) {
            return res.status(422).json({ msg: 'Campos obrigatórios não preenchidos!' });
        }
    
        this.usuarioModel.VerificarEmail({ email }, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Erro interno do servidor ao verificar email!' });
            }
    
            if (results.length > 0) {
                console.log(results);
                return res.status(422).json({ msg: 'Usuário já existe!' });
            }
    
            
            const nivel_acessoFinal = nivel_acesso || 'user';
    
            this.usuarioModel.criarUsuario({ nome, email, senha: senhaHash, nivel_acesso: nivel_acessoFinal }, (err, results) => {
                if (err) {
                    console.log('Erro ao tentar cadastrar usuário: ', err);
                    return res.status(500).json({ msg: 'Erro interno do servidor ao cadastrar usuário!' });
                }
    
                console.log('Cadastrado com sucesso!');
                return res.json({ id: results.insertId, nome, email });
            });
        });
    }
    


      loginUsuario(req, res) {
        const { nome, senha } = req.body;
    
        if (!nome || !senha) {
            return res.status(422).json({ msg: 'Nome e senha são obrigatórios.' });
        }
    
        try {

            console.log('Tentativa de login para o usuário:', nome);
            // Verificar se o usuário existe no banco de dados
            this.usuarioModel.loginUsuario({ nome }, async (err, results) => {
                if (err) {
                    console.error('Erro ao fazer login:', err);
                    return res.status(500).json({ msg: 'Erro interno do servidor.' });
                }

                if (results.length === 0) {
                    console.log('Usuário não encontrado!');
                    return res.status(401).json({ msg: 'Credenciais inválidas.' });
                }

                const verificarSenha = await bcrypt.compare(senha, results[0].senha);
                
                if (!verificarSenha) {
                    console.log('Senha inválida!', senha);
                    return res.status(401).json({ msg: 'Credenciais inválidas.'});
                }
                const secret = process.env.SECRET;

                // Gerar token JWT
                const usuario = {
                    id: results[0].id,
                    nome: results[0].name,
                    email: results[0].email,
                    nivel_acesso: results[0].nivel_acesso
                };

                const token = jwt.sign( usuario, secret,{expiresIn: '30s'}
                );
                res.status(200).json({ msg:'Autenticação realizada com sucesso', token });
            });
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({ msg: 'Erro interno do servidor.' });
        }
    }

    async listarUsuario(req, res){
        this.usuarioModel.listarUsuario((err, results)=>{
            if(err){
                console.log('erro ao tentar ver usuarios!');
            }
            res.json(results)
        });
    }

    async atualizarUsuario(req, res){
        const {id} = req.params;
        const {nome, senha, email} = req.body;
        this.usuarioModel.atualizarUsuario(id, {nome, email, senha}, (err, results) =>{
            if(err){
                console.log(`erro ao atlualizar o usuario ${id}`);
            }
            res.json({id, nome, email, senha});
        });
    }

    async excluirUsuario(req, res){
        const {id} = req.params;
        this.usuarioModel.excluirUsuario(id, (err ,results)=>{
            if(err){
                console.log(`Erro ao excluir usuario ${id}`);
            }
            res.json({message: 'Registro excluido com sucesso'})
        });
    }
}

module.exports = UsuarioController