import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import '../Styles/App3.css';
import HeaderReportes from '../Components/HeaderReportes';
import VisitantesGif from '../Assets/Img/visitantes.gif';
import '@fortawesome/fontawesome-free/css/all.css';

const VisitaSorpresa = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    fechaInicio: '',
    fechaFin: '',
    horaInicio: '',
    horaSalida: '',
    numdoc: '',
    nombresVisitante: '',
    apellidosVisitante: '',
    torre: '',
    apartamento: '',
    vehiculo: '',
    tipoVehiculo: '',
    placa: '',
    modelo: '',
    color: '',
    marca: ''
  });

  useEffect(() => {
    // Borrar datos del formulario
    setDatosFormulario({
      fechaInicio: '',
      fechaFin: '',
      horaInicio: '',
      horaSalida: '',
      identificacion: '',
      nombresVisitante: '',
      apellidosVisitante: '',
      torre: '',
      apartamento: '',
      vehiculo: '',
      tipoVehiculo: '',
      placa: '',
      modelo: '',
      color: '',
      marca: ''
    });
  }, []);

  const manejarCambioEntrada = (event) => {
    const { name, value } = event.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: value,
    });

    // Validación de la placa según el tipo de vehículo
    if (name === 'placa') {
      let esValido = false;

      if (datosFormulario.tipoVehiculo === 'automovil') {
        esValido = /^[A-Za-z]{3}\d{3}$/.test(value);
      } else if (datosFormulario.tipoVehiculo === 'motocicleta') {
        esValido = /^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(value);
      }

      if (!esValido && value !== '') {
        console.log('Placa no válida');
      }
    }
  };

  const manejarCambioVehiculo = (e) => {
    const { value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      vehiculo: value,
      tipoVehiculo: '',
      placa: '',
      modelo: '',
      color: '',
      marca: '',
    }));
  };

  const manejarCambioTipoVehiculo = (e) => {
    const { value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      tipoVehiculo: value,
      placa: '',
      modelo: '',
      color: '',
      marca: '',
    }));
  };

  const handleLimpiarCampos = () => {
    setDatosFormulario({
      fechaInicio: '',
      fechaFin: '',
      horaInicio: '',
      horaSalida: '',
      identificacion: '',
      nombresVisitante: '',
      apellidosVisitante: '',
      torre: '',
      apartamento: '',
      vehiculo: '',
      tipoVehiculo: '',
      placa: '',
      modelo: '',
      color: '',
      marca: ''
    });
  };

  return (
    <div>
      <HeaderReportes />
      <div className="App">
      <div className="container">
  <div className="left-section">
    <img 
      src={VisitantesGif} 
      alt="Icono Grande" 
      className="icono-grande" 
      style={{ marginTop: '150px' }} // Ajusta el valor según sea necesario
    /><br /><br></br>
    <h1>Agenda una Visita Sorpresa</h1>
    <br />
    <h2>Al recibir la aprobación por parte del residente, por favor diligenciar el formulario con los siguientes campos</h2>
  </div>

          <div className="outer-container" style={{ padding: '60px', marginTop: '500px', marginLeft: '20px', minHeight: '600px' }}>
            <div className="form-container">
              <h2 className="center-title">Generar Agendamiento</h2><br></br>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="formulario-grid">
                  <div>
                    < label htmlFor="fecha-inicio">
                      <i className ="fas fa-calendar-alt" /> Fecha de inicio:
                    </label>
                    <input
                      type="date"
                      id="fecha-inicio"
                      name="fechaInicio"
                      value={datosFormulario.fechaInicio}
                      onChange={manejarCambioEntrada}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="fecha-fin">
                      <i className="fas fa-calendar-alt" /> Fecha de fin:
                    </label>
                    <input
                      type="date"
                      id="fecha-fin"
                      name="fechaFin"
                      value={datosFormulario.fechaFin}
                      onChange={manejarCambioEntrada}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="hora-inicio">
                      <i className="fas fa-clock" /> Hora de inicio:
                    </label>
                    <input
                      type="time"
                      id="hora-inicio"
                      name="horaInicio"
                      value={datosFormulario.horaInicio}
                      onChange={manejarCambioEntrada}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="hora-salida">
                      <i className="fas fa-clock" /> Hora de salida:
                    </label>
                    <input
                      type="time"
                      id="hora-salida"
                      name="horaSalida"
                      value={datosFormulario.horaSalida}
                      onChange={manejarCambioEntrada}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="numdoc">
                      <i className="fas fa-id-card" /> Número de documento:
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
                      placeholder="Ingresa tu número de documento"
                      required
                    />
                    
                  </div>

                  <div>
                    <label htmlFor="nombres-visitante">
                      <i className="fas fa-user" /> Nombres del visitante:
                    </label>
                    <input
                      type="text"
                      id="nombres-visitante"
                      name="nombresVisitante"
                      value={datosFormulario.nombresVisitante}
                       onChange={manejarCambioEntrada}
                      onKeyPress={(e) => {
                      // Verifica si el carácter ingresado es una letra o un espacio
                      if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                      e.preventDefault(); // Evita la entrada si no es una letra
                      }
                      }}
                      required
                      placeholder="Ingresa tus nombres completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="apellidos-visitante">
                      <i className="fas fa-user" /> Apellidos del visitante:
                    </label>
                    <input
                      type="text"
                      id="apellidos-visitante"
                      name="apellidosVisitante"
                      value={datosFormulario.apellidosVisitante}
                      onChange={manejarCambioEntrada}
                      onKeyPress={(e) => {
                        // Verifica si el carácter ingresado es una letra o un espacio
                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                          e.preventDefault(); // Evita la entrada si no es una letra
                        }
                      }}
                      required
                      placeholder="Ingresa tus apellidos completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="torre">
                      <i className="fas fa-building" /> Torre del apartamento:
                    </label>
                    <select
                      id="torre"
                      name="torre"
                      value={datosFormulario.torre}
                      onChange={manejarCambioEntrada}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="A">Torre A</option>
                      <option value="B">Torre B</option>
                      <option value="C">Torre C</option>
                      <option value="D">Torre D</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="apartamento">
                      <i className="fas fa-door-closed" /> Número de apartamento:
                    </label>
                    <select
                      id="apartamento"
                      name="apartamento"
                      value={datosFormulario.apartamento}
                      onChange={manejarCambioEntrada}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="101">101</option>
                      <option value="102">102</option>
                      <option value="103">103</option>
                      <option value="104">104</option>
                      <option value="201">201</option>
                      <option value="202">202</option>
                      <option value="203">203</option>
                      <option value="204">204</option>
                      <option value="301">301</option>
                      <option value="302">302</option>
                      <option value="303">303</option>
                      <option value="304">304</option>
                      <option value="401">401</option>
                      <option value="402">402</option>
                      <option value="403">403</option>
                      <option value="404">404</option>
                      <option value="501">501</option>
                      <option value="502">502</option>
                      <option value="503">503</option>
                      <option value="504">504</option>
                      <option value="601">601 </option>
                      <option value="602">602</option>
                      <option value="603">603</option>
                      <option value="604">604</option>
                      {/* Añade más opciones aquí */}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="vehiculo">
                      <i className="fas fa-car" /> ¿Posee Vehículo?
                    </label>
                    <select
                      id="vehiculo"
                      name="vehiculo"
                      value={datosFormulario.vehiculo}
                      onChange={manejarCambioVehiculo}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="No">No</option>
                      <option value="Si">Sí</option>
                    </select>
                  </div>

                  {datosFormulario.vehiculo === 'Si' && (
                    <div className="vehiculo-info">
                      <div>
                        <label htmlFor="tipoVehiculo">
                          Tipo de vehículo:
                        </label>
                        <select
                          id="tipoVehiculo"
                          name="tipoVehiculo"
                          value={datosFormulario.tipoVehiculo}
                          onChange={manejarCambioTipoVehiculo}
                          required
                        >
                          <option value="">Seleccione</option>
                          <option value="automovil">Automóvil</option>
                          <option value="motocicleta">Motocicleta</option>
                          <option value="bicicleta">Bicicleta</option>
                        </select>
                      </div>

                      {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="placa">
                            <i className="fas fa-car" />
                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Placa:
                          </label>
                          <input
                            type="text"
                            id="placa"
                            name="placa"
                            value={datosFormulario.placa}
                            onChange={manejarCambioEntrada}
                            placeholder="Ej: ABC123 o ABC12D"
                            required
                          />
                          {/* Mensaje de error */}
                          {datosFormulario.placa && !/^[A-Za-z]{3}\d{3}$/.test(datosFormulario.placa) && datosFormulario.tipoVehiculo === 'automovil' && (
                            <small style={{ color: 'red' }}>Formato inválido para automóvil (Ej: ABC123)</small>
                          )}
                          {datosFormulario.placa && !/^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(datosFormulario.placa) && datosFormulario.tipoVehiculo === 'motocicleta' && (
                            <small style={{ color: 'red' }}>Formato inválido para motocicleta (Ej: ABC12D)</small>
                          )}
                        </div>
                      ) : null}

                      {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="modelo">
                            <i className="fas fa-car" />
                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Modelo:
                          </label>
                          <input
                            type="text"
                            id="modelo"
                            name="modelo"
                            value={datosFormulario.modelo}
                            onChange={(e) => {
                              // Verifica si el nuevo valor solo contiene letras y espacios
                              const newValue = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                              }
                            }}
                            onKeyPress={(e) => {
                              // Verifica si el carácter ingresado es una letra o un espacio
                              if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                e.preventDefault(); // Evita la entrada si no es una letra o un espacio
                              }
                            }}
                            placeholder="Ej: Toyota Corolla" // Texto de ayuda
                            required
                          />
                          {datosFormulario.tipoVehiculo === 'automovil' ? (
                            <small>Ingresa el modelo del automóvil (Ej: Toyota Corolla)</small>
                          ) : (
                            <small>Ingresa el modelo de la motocicleta (Ej: Honda CB500F)</ small>
                          )}
                        </div>
                      ) : null}

                      {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="color">
                            <i className="fas fa-palette" /> Color:
                          </label>
                          <select
                            id="color"
                            name="color"
                            value={datosFormulario.color}
                            onChange={manejarCambioEntrada}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Negro">Negro</option>
                            <option value="Blanco">Blanco</option>
                            <option value="Gris">Gris</option>
                          </select>
                        </div>
                      ) : null}

                      {datosFormulario.tipoVehiculo === 'bicicleta' ? (
                        <div>
                          <label htmlFor="marca">
                            <i className="fa fa-bicycle" /> Mar ca:
                          </label>
                          <input
                            type="text"
                            id="marca"
                            name="marca"
                            value={datosFormulario.marca}
                            onChange={(e) => {
                              // Verifica si el nuevo valor solo contiene letras y espacios
                              const newValue = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                              }
                            }}
                            onKeyPress={(e) => {
                              // Verifica si el carácter ingresado es una letra o un espacio
                              if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                e.preventDefault(); // Evita la entrada si no es una letra o un espacio
                              }
                            }}
                            placeholder="Ej: Trek, Specialized" // Texto de ayuda
                            required
                          />
                        </div>
                      ) : null}

                      {datosFormulario.tipoVehiculo === 'bicicleta' ? (
                        <div>
                          <label htmlFor="color">
                            <i className="fas fa-palette" /> Color:
                          </label>
                          <select
                            id="color"
                            name="color"
                            value={datosFormulario.color}
                            onChange={manejarCambioEntrada}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Negro">Negro</option>
                            <option value="Blanco">Blanco</option>
                            <option value="Gris">Gris</option>
                          </select>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>

                <div className="center-buttons" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button className="ver-mas-button">
                    <i className="fas fa-calendar-check" /> Generar Agendamiento
                  </button>
                  <button
                    className="ver-mas-button"
                    id="limpiar-campos"
                    onClick={handleLimpiarCampos}
                  >
                    <i className="fas fa-eraser" /> Limpiar Campos
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />

    </div>
  );
};

export default VisitaSorpresa;