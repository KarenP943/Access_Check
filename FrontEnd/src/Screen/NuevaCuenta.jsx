import React, { useState, useEffect } from 'react';
import '../Styles/App3.css';
import Perfil from '../Assets/Img/perfil.gif';
import HeaderAdminSol from '../Components/HeaderAdminSol';
import Footer from '../Components/Footer';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

const CrearCuenta = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    tipoDocumento: '',
    numdoc: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    contrasenia: ''
  });

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/usuario'); // Cambia esta URL según tu API
        const usuario = response.data;

        // Actualiza el estado con los datos del usuario
        setDatosFormulario({
          tipoDocumento: usuario.tipoDocumento || '',
          numdoc: usuario.numdoc || '',
          nombres: usuario.nombres || '',
          apellidos: usuario.apellidos || '',
          telefono: usuario.telefono || '',
          email: usuario.email || '',
          contrasenia: usuario.contrasenia || ''
        });
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    obtenerDatosUsuario();
  }, []);

  const manejarCambioEntrada = (event) => {
    const { name, value } = event.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });
  };

  const manejarEnvioFormulario = async (event) => {
    event.preventDefault(); // Previene la recarga de la página
    try {
      await Axios.put('http://localhost:3001/usuario', datosFormulario); // Cambia esta URL según tu API para actualizar
      alert('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert('Error al actualizar los datos');
    }
  };

  return (
    <div>
      <HeaderAdminSol />
      <div className="App">
        <h1 className="apartment-list-title typing-text">Crear una nueva Cuenta</h1>
        <div className="container">
          <div className="left-section">
            <img src={Perfil} alt="Icono Grande" className="icono-grande" style={{ marginTop: '5px' }} />
            <h1>Crear Nueva Cuenta</h1>
            <h2>Aquí puedes Crear la cuenta del funcionario Vigilante</h2>
          </div>
          <div className="outer-container" style={{ padding: '60px', marginTop: '150px', marginLeft: '10px', minHeight: '600px', flexGrow: 1 }}>
            <div className="form-container" style={{ marginTop: 'auto' }}>
              <h2 className="center-title">Crear Nueva Cuenta Funcionario</h2><br />
              <form id="reporte-form" onSubmit={manejarEnvioFormulario}>
                <div className="formulario-grid">
                  <div>
                    <label htmlFor="nombres">
                      <i className="fas fa-user" /> Nombres:
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      value={datosFormulario.nombres}
                      onChange={manejarCambioEntrada}
                      onKeyPress={(e) => {
                        // Verifica si el carácter ingresado es una letra o un espacio
                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                          e.preventDefault(); // Evita la entrada si no es una letra
                        }
                      }}
                      required
                      placeholder="Ingresa los nombres completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="apellidos">
                      <i className="fas fa-user " /> Apellidos:
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={datosFormulario.apellidos}
                      onChange={manejarCambioEntrada}
                        onKeyPress={(e) => {
                        // Verifica si el carácter ingresado es una letra o un espacio
                       if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                       e.preventDefault(); // Evita la entrada si no es una letra
                       }
                       }}
                      required
                      placeholder="Ingresa los apellidos completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipodoc">
                      <i className="fas fa-id-card" /> Tipo Documento:
                    </label>
                    <select 
                      type="text"
                      id="tipo-documento"
                      name="tipoDocumento"
                      value={datosFormulario.tipoDocumento}
                      onChange={manejarCambioEntrada}
                      required
                        >
                          <option value="">Seleccione...</option>
                         <option value="cc">C.C</option>
                         <option value="ce">C.E</option>
                        </select>
                  </div>

                  <div>
                    <label htmlFor="numdoc">
                      <i className="fas fa-id-card" /> Número Documento:
                    </label>
                    <input
                      type="text"
                      id="numdoc"
                      name="numdoc"
                      value={datosFormulario.numdoc}
                      onChange={manejarCambioEntrada}
                        onKeyPress={(e) => {
                        if (!/^\d+$/.test(e.key)) {
                        e.preventDefault();
                       }
                       }} 
                       maxLength={10}
                       required
                       placeholder="Ingresa el número de documento"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono">
                      <i className="fas fa-phone" /> Teléfono:
                    </label>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={datosFormulario.telefono}
                      onChange={(e) => {
                       // Verifica si el nuevo valor tiene 10 o menos caracteres y solo contiene números
                      const newValue = e.target.value;
                      if (/^\d{0,10}$/.test(newValue)) {
                      manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                       }
                      }}
                      onKeyPress={(e) => {
                      // Verifica si el carácter ingresado es un número
                       if (!/^\d+$/.test(e.key)) {
                      e.preventDefault(); // Evita la entrada si no es un número
                      }
                      }}
                      required
                      placeholder="Ingresa el número de teléfono"
                      />
                  </div>

                  <div>
                    <label htmlFor="email">
                      <i className="fas fa-envelope" /> Correo electrónico:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={datosFormulario.email}
                      onChange={manejarCambioEntrada}
                      placeholder="ejemplo@correo.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contrasenia">
                      <i className="fas fa-lock" /> Contraseña :
                    </label>
                    <input
                      type="password"
                      id="contrasenia"
                      name="contrasenia"
                      value={datosFormulario.contrasenia}
                      onChange={manejarCambioEntrada}
                      maxLength={8} // Limita la entrada a 8 caracteres
                      placeholder="Contraseña creada aleatoriamente"
                      required
                    />
                    <small>(máximo 8 caracteres)</small>
                  </div>
                </div>

                <div className="center-buttons">
                  <button className="ver-mas-button" id="actualizarBtn" type="submit">
                    <i className="fas fa-actualizar" /> Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default CrearCuenta;