import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import welcomeImage from '../assets/images/welcomeF.svg';
import Abbio from '../assets/images/Abbio.svg'; 
import Blanc from '../assets/images/LogoBlanc.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PaymentIcon from '@mui/icons-material/Payment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RondLoc from '../assets/images/RondLoc.svg';
import RondThunder from '../assets/images/RondThunder.svg';
import RondVelo from '../assets/images/RondVelo.svg';
import { footerBot, pRond, rond, pStyle123, paragraphContainerStyle ,iconStyleLine ,iconStyle , containerStyleInline, rowStyle, textContainerStyle, homeStyle, homeStyleParapgraph, centeredContentStyle, h1Style, h2Style, pStyle, imgStyle, buttonTextStyle } from '../assets/styles/style.js'

function HomePage() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh', 
    backgroundImage: `url(${welcomeImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    padding: '50px 200px 100px 200px',
    };
  return (
    <div>
      <div style={containerStyle}>
        <div style={rowStyle}>
          <div style={textContainerStyle}>
            <img src={Blanc} alt="Logo Saveurs-Saisonnieres blanc" style={imgStyle} />
          </div>
          <div style={textContainerStyle}>
            <Link to="/login">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  bgcolor: '#FFFFFF', 
                  '&:hover': { bgcolor: '#E5E5E5' },
                  ...buttonTextStyle, 
                }}
              >
                Se connecter
              </Button>
            </Link>
            <Link to="/register">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  bgcolor: '#FFFFFF', 
                  '&:hover': { bgcolor: '#E5E5E5' },
                  ...buttonTextStyle, 
                }}
              >
                S&apos;inscrire
              </Button>
            </Link>
          </div>
        </div>
        <div style={homeStyle}>
          <h1>Commander des légumes et fruits frais de producteurs locaux</h1>
            <div style={homeStyleParapgraph}>
              <p>Où nous trouver : </p>
              <p><LocationOnIcon sx={{ fontSize: 40, marginRight: 2 }} />14 rue des étoiles 34000 Montpellier</p>
            </div>
        </div>
        <div style={rowStyle}>
          <div style={textContainerStyle}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FFFFFF', 
                '&:hover': { bgcolor: '#E5E5E5' },
                ...buttonTextStyle, 
              }}
            >
              Commande prête<br />1h après votre commande
            </Button>
          </div>
          <div style={{ ...textContainerStyle, flex: '1', textAlign: 'center' }}>
            <img src={Abbio} alt="Logo Culture Bio blanc" style={imgStyle} />
          </div>
          <div style={textContainerStyle}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                bgcolor: '#FFFFFF', 
                '&:hover': { bgcolor: '#E5E5E5' },
                ...buttonTextStyle, 
              }}
            >
              Récupérer directement <br />chez votre producteur
            </Button>
          </div>
        </div> 
      </div>
      <div style={centeredContentStyle}>
        <h1 style={h1Style}>Commandez vos fruits et légumes simplement </h1>
        <p style={pStyle}>En savoir plus sur les courses en ligne</p>
      </div>
      <div style={containerStyleInline}>
        <p style={{ display: 'inline-block' }}>
          <LocationOnIcon sx={iconStyle} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <HorizontalRuleIcon sx={iconStyleLine} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <PaymentIcon sx={iconStyle} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <HorizontalRuleIcon sx={iconStyleLine} />
        </p>
        <p style={{ display: 'inline-block' }}>
          <ShoppingCartIcon sx={iconStyle} />
        </p>
      </div>
      <div style={paragraphContainerStyle}>
        <p style={pStyle123}> 1. Je repère mon primeur</p>
        <p style={pStyle123}> 2. Je commande et paye en ligne</p>
        <p style={pStyle123}> 3. Ma commande prêt en 1h</p>
      </div>
      <div>
        <h1 style={h2Style}>Les avantages d’une commande chez Saveurs Saisonnières</h1>
      </div>
      <div style={containerStyleInline}>
        <img src={RondVelo} alt="Rond de couleur vert icon vélo" style={rond} />
        <p style ={pRond}>Produit frais<br />et locale</p>
        <img src={RondLoc} alt="Rond de couleur jaune icon localisation" style={rond} />
        <p style ={pRond}>Relation de proximité,<br />moins de pollution</p>
        <img src={RondThunder} alt="Rond de couleur marron icon thunder" style={rond} />
        <p style ={pRond}>Rapidité de<br />préparation</p>
      </div>
      <div>
        <h2 style={footerBot}>Venez découvrir Saveurs Saisonnières en magasin, pour plus de proximité</h2>
      </div>
    </div>
  );
}

export default HomePage;
