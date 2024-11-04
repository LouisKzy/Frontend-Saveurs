import { Link } from 'react-router-dom';
import LogoFull from '../assets/images/LogoHome.png';
import { useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
function LogoHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Link to="/">
            <img src={LogoFull} alt="Logo page d'accueil Saveurs Saisonnières" style={{ width: isMobile ? '120px' : '175px', height: 'auto', marginRight: isMobile ? 10 : 0 }} />
        </Link>
    );
}

export default LogoHome;
