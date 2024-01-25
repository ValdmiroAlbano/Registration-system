import Button from '../../components/Button/Button';
import { useNavigate} from 'react-router-dom';
import "./EscolherPaginas.css"


function EscolherPaginas() {

    const navegate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
      return <navegate to="/login" />;
  }
  return (
    <div className="container">
        <h1 className='label'>Tenha acesso as tuas informações</h1>
        
        <div className="content">
            <Button Text="Ver Google maps" onClick={()=>{navegate("/mapa")}}/>
            <Button Text="Ver Usuario" onClick={()=>{navegate("/dashboard")}}/>
        </div>
    </div>
  )
}

export default EscolherPaginas