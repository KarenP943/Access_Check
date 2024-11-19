import React, { useState, useEffect } from 'react';
import '../Styles/App3.css';
import HeaderReportes from '../Components/HeaderReportes';
import Footer from '../Components/Footer';
import Pendiente from '../Assets/Img/pendiente.png';
import Planificacion from '../Assets/Img/planificacion.png';
import Verificado from '../Assets/Img/verificado.png';
import Coche from '../Assets/Img/coche.png';
import Complet from '../Assets/Img/complet.png';
import '@fortawesome/fontawesome-free/css/all.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VerAgendamiento() {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  useEffect(() => {

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowScrollUpBtn(scrollY > 100);
      setShowScrollDownBtn(scrollY < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchValue('');
    setIsSearchVisible(true);
  };

  const hideSearchBar = () => {
    setIsSearchVisible(false);
  };

  //modal

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose =() => setIsModalOpen(false);
  const handleOpen =()=> setIsModalOpen (true);



  return (
    <div>
      <div className="App">
        <HeaderReportes />
        <header>
          <div className="white-container">
            <h2 className="center-title">Información de Residentes</h2>
            <div className="search-container">
              <select id="searchOption" className="search-bar" onChange={handleSearchTypeChange}>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="apartment">Buscar por número de apartamento</option>
                <option value="name">Buscar por nombre del residente</option>
              </select>

              {isSearchVisible && (
                <div className="input-with-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type={searchType === 'apartment' ? 'number' : 'text'}
                    id="searchInput"
                    placeholder={searchType === 'apartment' ? "Ingrese el número de apartamento..." : "Ingrese el nombre del residente..."}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-bar"
                    style={{ flex: 1, paddingRight: '30px' }}
                  />
                  <i className="fas fa-search icon" style={{ marginLeft: '10px' }}></i>
                </div>
              )}

              {isSearchVisible && (
                <div className="button-container">
                  <button className="ver-mas-button" onClick={hideSearchBar}>
                    Ocultar barra de búsqueda
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <h1 className="apartment-list-title typing-text">Ver Agendamientos</h1>
        <h2 className="access-check-title">Conjunto Residencial Zafiro La Prosperidad</h2>
        <h3 className="access-check-title">Access Check</h3>
        <div className="summary" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white', boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
          <div className="summary-item">
            <h3>Visitas Programadas</h3>
            <p>10</p >
            <div className="option-icon">
              <img src={Planificacion} alt="Visitas Programadas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Pendientes</h3>
            <p>6</p>
            <div className="option-icon">
              <img src={Pendiente} alt="Visitas Pendientes" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Activas</h3>
            <p>6</p>
            <div className="option-icon">
              <img src={Verificado} alt="Visitas Activas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Completadas</h3>
            <p>4</p>
            <div className="option-icon">
              <img src={Complet} alt="Visitas Completadas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Vehículos Registrados</h3>
            <p>5</p>
            <div className="option-icon">
              <img src={Coche} alt="coche" />
            </div>
          </div>
        </div>
        <br />
        <div className="apartment-list" style={{ maxWidth: '1090px', margin: '0 auto', padding: '50px 100px 100px 100px' }}>
          <div className="agendamientos">
            <div className="agendamiento-card">
              <h2 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-building" style={{ color: '#6e3f1d' }} /> TORRE D
              </h2>
              <h3 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-door-open" style={{ color: '#6e3f1d' }} /> Apartamento 101
              </h3>
              <p>
                <i className="fas fa-user" style={{ color: '#6e3f1d' }} /> Nombre Visitante:
              </p>
              <p>
                <i className="fas fa-clock" style={{ color: '#6e3f1d' }} /> Hora de entrada:
              </p>
              <p>
                <i className="fas fa-car" style={{ color: '#6e3f1d' }} /> Vehículo:
              </p>
              <div className="button-container">
              <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
                <li><i className="fas fa-user" /> Nombre Visitante Principal: </li>
                <li><i className="fas fa-phone" /> Teléfono: </li>
                <li><i className="fas fa-parking" /> Parqueadero: </li>
                <li><i className="fas fa-id-card" /> Tipo de Documentos: </li>
                <li><i className="fas fa-id-badge" /> Número de Documento: </li>
                <li><i className="fas fa-tags" /> Cantidad de Visitantes: </li>
                <li><i className="fas fa-calendar-alt" /> Fecha de salida: </li>
                <li><i className="fas fa-clock" /> Hora de Salida: </li>
              </ul>
        </Modal.Body>
      </Modal>
              </div>    
            </div>
            <div className="agendamiento-card">
              <h2 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-building" style={{ color: '#6e3f1d' }} /> TORRE A
              </h2>
              <h3 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-door-open" style={{ color: '#6e3f1d' }} /> Apartamento 504
              </h3>
              <p>
                <i className="fas fa-user" style={{ color: '#6e3f1d' }} /> Nombre Visitante:
              </p>
              <p>
                <i className="fas fa-clock" style={{ color: '#6e3f1d' }} /> Hora de entrada:
              </p>
              <p>
                <i className="fas fa-car" style={{ color: '#6e3f1d' }} /> Vehículo:
              </p>
              <div className="button-container">
               <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
                <li><i className="fas fa-user" /> Nombre Visitante Principal: </li>
                <li><i className="fas fa-phone" /> Teléfono: </li>
                <li><i className="fas fa-parking" /> Parqueadero: </li>
                <li><i className="fas fa-id-card" /> Tipo de Documentos: </li>
                <li><i className="fas fa-id-badge" /> Número de Documento: </li>
                <li><i className="fas fa-tags" /> Cantidad de Visitantes: </li>
                <li><i className="fas fa-calendar-alt" /> Fecha de salida: </li>
                <li><i className="fas fa-clock" /> Hora de Salida: </li>
              </ul>
        </Modal.Body>
      </Modal>
            </div>
            </div>
            <div className="agendamiento-card">
              < h2 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-building" style={{ color: '#6e3f1d' }} /> TORRE C
              </h2>
              <h3 style={{ color: '#6e3f1d' }}>
                <i className="fas fa-door-open" style={{ color: '#6e3f1d' }} /> Apartamento 601
              </h3>
              <p>
                <i className="fas fa-user" style={{ color: '#6e3f1d' }} /> Nombre Visitante:
              </p>
              <p>
                <i className="fas fa-clock" style={{ color: '#6e3f1d' }} /> Hora de entrada:
              </p>
              <p>
                <i className="fas fa-car" style={{ color: '#6e3f1d' }} /> Vehículo:
              </p>
              <div className="button-container">
              <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
                <li><i className="fas fa-user" /> Nombre Visitante Principal: </li>
                <li><i className="fas fa-phone" /> Teléfono: </li>
                <li><i className="fas fa-parking" /> Parqueadero: </li>
                <li><i className="fas fa-id-card" /> Tipo de Documentos: </li>
                <li><i className="fas fa-id-badge" /> Número de Documento: </li>
                <li><i className="fas fa-tags" /> Cantidad de Visitantes: </li>
                <li><i className="fas fa-calendar-alt" /> Fecha de salida: </li>
                <li><i className="fas fa-clock" /> Hora de Salida: </li>
              </ul>
        </Modal.Body>
      </Modal>
    </div>
            </div>
          </div>
        </div>
        <br />
        <Footer />
        {showScrollDownBtn && (
          <button id="scrollDownBtn" className="scroll-btn" onClick={scrollToBottom}>
            ↓
          </button>
        )}
        {showScrollUpBtn && (
          <button id="scrollUpBtn" className="scroll-btn" onClick={scrollToTop}>
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default VerAgendamiento;