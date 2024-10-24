import { Link } from 'react-router-dom';
import LogoFull from '../assets/images/LogoHome.svg';

function LogoHome() {
    return (
        <Link to="/" style={{ textDecoration: 'none', position: 'absolute', top: '-62px', left: '80px'}}>
            <img src={LogoFull} alt="Logo page d'accueil Saveurs Saisonnières" style={{ width: '200px', height: 'auto' }} />
        </Link>
    );
}

export default LogoHome;
