import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Abbio from '../assets/images/Abbio.svg';
import theme from '../assets/styles/theme';

function Footer() {
  return (
    <Box sx={{ color: 'white' ,width: '100%', height: 168, backgroundColor: theme.palette.primary.main, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {/* Colonne 1: Liens utiles */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold'}}  gutterBottom>Lien utiles:</Typography>
        <Typography variant="body1" gutterBottom><Link sx={{ color: 'white' }} href="/legal-notice">Mentions légales</Link></Typography>
        <Typography variant="body1" gutterBottom><Link sx={{ color: 'white' }} href="/cgu-cgv">CGU / CGV</Link></Typography>
        <Typography variant="body1" gutterBottom><Link sx={{ color: 'white' }} href="/privacy-policy">Politique de confidentialité</Link></Typography>
      </Box>

      {/* Colonne 2: Suivez nous */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2}} gutterBottom >Suivez nous:</Typography>
        <InstagramIcon sx={{ fontSize: 40, marginRight: 10}} />
        <FacebookIcon sx={{ fontSize: 40, marginRight: 10}} />
        {/* Ajoutez d'autres réseaux sociaux si nécessaire */}
      </Box>

      {/* Colonne 3: Saveur Saisonnière */}
      <Box >
        <Typography variant="h6" sx={{ fontWeight: 'bold'}} gutterBottom>A propos:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <PhoneIcon sx={{ fontSize: 20, marginRight: 5 }} />
          <Typography variant="body1">04 12 34 56 78</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <EmailIcon sx={{ fontSize: 20, marginRight: 5 }} />
          <Typography variant="body1">local@saveursaison.com</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon sx={{ fontSize: 20, marginRight: 5 }} />
          <Typography variant="body1">14, rue des étoiles, 34000 Montpellier</Typography>
        </Box>
      </Box>

      {/* Colonne 4: Image logo AB Bio */}
      <Box>
        <img src={Abbio} alt="Logo AB Bio" style={{ width: 100, height: 100 }} />
      </Box>
    </Box>
  );
}

export default Footer;
