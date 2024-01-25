import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button'
import "./HomePage.css"

function HomePage(){
    const navigate = useNavigate()

    function loginPage(){
        navigate('login');
    }

    function siginPage(){
        navigate('criar conta');
    }

    return(
        <div className='container'> 
            <label className='label'>Bem-vindo ao teste API</label>
            <div className="content">
                <Button  onClick={loginPage} nome='Fazer Login' Text="Fazer Login" />
                <Button  onClick={siginPage} nome='Criar conta' Text="Criar conta" />
            </div>   
        </div>
    )
}
       
export default HomePage