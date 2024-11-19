import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/App3.css';
import { loginResidente, loginAdmin, loginFuncionario } from '../services/Api';
import HeaderIn from '../Components/HeaderIn';
import Footer from '../Components/Footer';
import Inicio1 from '../Assets/Img/inicio1.jpg';
import '@fortawesome/fontawesome-free/css/all.css';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numdoc: '',
    contrasenia: '',
    tipoUsuario: 'residentes',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { numdoc, contrasenia, tipoUsuario } = formData;

    try {
      if (tipoUsuario === 'residentes') {
        await loginResidente(numdoc, contrasenia);
        navigate('/InicioResi');
      } else if (tipoUsuario === 'vigilante') {
        await loginFuncionario(numdoc, contrasenia);
        navigate('/InicioVig');
      } else if (tipoUsuario === 'admin') {
        await loginAdmin(numdoc, contrasenia);
        navigate('/InicioAdmin');
      }

      setSuccessMessage('Inicio de sesión exitoso.');
      setError('');
    } catch (error) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="App">
      <HeaderIn /><br />
      <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>
      <div className="container">
        <div className="left-section" style={{ marginTop: '-260px', paddingLeft: '40px' }}>
          <img src={Inicio1} alt="Icono Grande" className="icono-grande" />
          <h1>Inicio de Sesión</h1>
          <br />
          <h1>¡Bienvenido de nuevo!</h1>
          <h2>Por favor, ingresa tus datos para iniciar sesión</h2>
        </div>

        <div className="outer-container" style={{ padding: '80px', marginTop: '80px', marginLeft: '100px', minHeight: '80px' }}>
          <div className="form-container" style={{ width: '500px' }}>
            <h2 className="center-title">Iniciar Sesión</h2>
            <form id="reporte-form" onSubmit={handleLogin}>
              <label htmlFor="numdoc">
                <i className="fas fa-id-card" /> <b>Número de documento:</b>
              </label>
              <input
                type="text"
                id="numdoc"
                name="numdoc"
                value={formData.numdoc}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/^\d+$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
                placeholder="Ingresa tu número de documento"
                required
              />

              <label htmlFor="contrasenia">
                <i className="fas fa-lock" /> <b>Contraseña:</b>
              </label>
              <input
                type="password"
                id="contrasenia"
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleInputChange}
                placeholder="Ingresa una contraseña segura"
                maxLength={8} // Limita la entrada a 8 caracteres
                required
              />
              <small>(máximo 8 caracteres)</small>
              <div className="forgot-password">
              <p>
                <a href="/recuperar-contrasena" onClick={() => navigate('/recuperar-contrasena')}>
                  ¿Olvidaste tu contraseña?
                </a>
              </p>
            </div>

              {error && <p className="error-message">{error}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}

              <div className="center-buttons">
                <button className="ver-mas-button" id="loginBtn" type="submit">
                  <i className="fas fa-sign-in-alt" /> Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default Login;