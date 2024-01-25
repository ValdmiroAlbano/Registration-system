
const mysql = require('mysql2');

class UsuarioModel {
    constructor(){
        this.conexao = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'db_autenticacao'
        });

        this.conexao.connect((err)=>{
            if(err){
                console.log('Erro ao conectar com o banco: ', err);
            }else{
                console.log('Conexao com banco bem sucedida!');
            }
        });
    }

    criarUsuario(usuario, callback){
        const sql = 'INSERT INTO users(name, email, senha, nivel_acesso) VALUES (?, ?, ?, ?)';
        this.conexao.query(sql, [usuario.nome, usuario.email, usuario.senha, usuario.nivel_acesso], callback);
    }
    
    
    VerificarEmail( usuario, callback){
        const sql = 'SELECT email FROM users WHERE email = ?';
        this.conexao.query(sql, [usuario.email], callback);
    }

    VerificarId( usuario, callback){
        const sql = 'SELECT id FROM users WHERE id = ?';
        this.conexao.query(sql, [usuario.id], callback);
    }

    loginUsuario(usuario, callback) {
    const sql = 'SELECT * FROM users WHERE name = ? '; 
    this.conexao.query(sql, [usuario.nome], callback);
    }

    listarUsuario(callback){
        const sql = 'SELECT * FROM users';
        this.conexao.query(sql, callback);
    }

    atualizarUsuario(id, usuario, callback){
        const sql = 'UPDATE users SET name = ?, email = ?, senha = ? WHERE id = ?';
        this.atualizarUsuario.conexao.query(sql,[usuario.name, usuario.email, usuario.senha, id], callback);
    }

    excluirUsuario(id, callback){
        const sql = 'DELETE FROM users WHERE id = ?';
        this.conexao.query(sql, [id], callback);
    }
}

module.exports = UsuarioModel;