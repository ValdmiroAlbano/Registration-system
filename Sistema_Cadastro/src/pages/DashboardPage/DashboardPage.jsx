import axios from "axios";
import { FaTrash, FaEdit, FaFilePdf } from "react-icons/fa";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"
import {useEffect, useState } from 'react';
import "./DashboardPage.css";
import usuariosPDF from "../Reports/Usuarios/usuarios";

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const [nivelAcesso, setNivelAcesso] = useState('');
  const [nome, setName] = useState();
  //const [onEdit, setOnEdit] = useState(null);

  //Ver usuarios
  async function getUsers() {
    try {
      const resposta = await axios.get("http://localhost:3000/api/usuarios/lista");
      setUsers(resposta.data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro na requisição. Consulte o console para mais detalhes.");
    }
  }

  //Apagar Usario
  async function bodyApagar(id) {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);
      console.log("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao tentar apagar usuário:", error);
    }
  }
  // async function bodyEditar(item){

  // }
  useEffect(() => {
    if (token) {
      const descodificarToken = jwtDecode(token);
      setNivelAcesso(descodificarToken.nivel_acesso);
      setName(descodificarToken.nome);
    }
  }, [token]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Container">
      <h1>{nome} logado</h1>
      <form className="FormContainer"  onSubmit={handleSubmit}>
        <div className="InputArea">
          <label>Nome</label>
          <input type="text" name="nome" className="Input" />
        </div>

        <div className="InputArea">
          <label className="Label">E-mail</label>
          <input type="email" name="email" className="Input" />
        </div>
        <button type="submit" className="Button">
          Salvar
        </button>
        <div className="Relatorio">
          <FaFilePdf  onClick={()=> usuariosPDF(users)}/>
          <p>Gerar PDF</p>
        </div>
        <table className="Table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => (
              <tr key={i}>
                <td width="30%">{item.name}</td>
                <td width="30%">{item.email}</td>
                <td align="center" width="5%">
                 {
                  nivelAcesso === 'Admin' ? (
                    <FaEdit /*onClick={()=> bodyEditar(item)}*//>
                  ): null
                 }
                </td>
                <td align="center" width="5%">
                {
                 nivelAcesso === 'Admin' ? (
                  <FaTrash onClick={() => bodyApagar(item.id)} />
                ) : null
                }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default DashboardPage;
