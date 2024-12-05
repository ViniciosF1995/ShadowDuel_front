import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import api from "../config/axios";
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Login() {

  const { login } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password
    };
    console.log(loginData)
    try {
      const response = await api.post('/auth/login', loginData);
      console.log(response)
      login(response.data.token);
      navigate("/caminho");
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }

  };

  return (
    <div className='container'>
      {/* <img className='imgFundo' src="./src/assets/images/imgCadastro.png" alt="" /> */}

      <div className='parteCima'>

        <div className='divLogo'>
          <img className='Logo' src="./src/assets/images/LogoShadowDuel.png" alt="" />
          <img className='shadowDuel' src="./src/assets/images/shadowDuel.png" alt="" />
        </div>
      </div>


      <form className='parteBaixo' onSubmit={(e) => handleLogin(e)}>

        <div className='divLogar'>

          <div className='textoInicial'>
            <h1 className='tituloLogin'>Bem vindo de volta!</h1>
            <p className='subTitulo'>Estamos felizes em ter você de volta</p>
          </div>

          <div className='divDescricao'>
            <p className='descricaoInput'>Email*</p>
            <input onChange={(e) => setEmail(e.target.value)} type="text" required />
          </div>

          <div className='divDescricao'>
            <p className='descricaoInput'>Senha*</p>
            <input onChange={(e) => setPassword(e.target.value)} type="text" required />
          </div>

          <Link to="/cadastro">
            <p>Não tem uma conta?</p>
          </Link>

          <button className='botaoEntrar' onClick={(e) => handleLogin()}>Entrar</button>

        </div>
        </form >
    </div>

   
    )
}

export default Login