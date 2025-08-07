import logo from '../../public/image/logo.png'
export const Header = ({ vistaActual, onCambiarVista }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-color-custom">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={logo} alt="Logo" height="100rem"/>
                </a>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button 
                                className={`nav-link texts btn btn-link ${vistaActual === 'formulario' ? 'active' : ''}`}
                                onClick={() => onCambiarVista('formulario')}
                                data-bs-toggle="collapse" 
                                data-bs-target="#navbarNav"
                            >
                                📝 Nuevo Traslado
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link texts btn btn-link ${vistaActual === 'lista' ? 'active' : ''}`}
                                onClick={() => onCambiarVista('lista')}
                                data-bs-toggle="collapse" 
                                data-bs-target="#navbarNav"
                            >
                                📋 Ver Traslados
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}