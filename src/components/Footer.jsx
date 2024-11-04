import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Abbio from "../assets/images/Abbio.svg";
import themeColors from "../assets/styles/theme";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        color: "white",
        width: "100%",
        backgroundColor: themeColors.palette.primary.main,
        py: 4,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-around"
        alignItems="center"
      >
        {/* Colonne 1: Liens utiles */}
        <Grid item xs={12} sm={6} md={3} textAlign="center" sx={{marginBottom: isMobile ? 4 : 0,}}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            Lien utiles:
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link sx={{ color: "white" }} href="/legal-notice">
              Mentions légales
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link sx={{ color: "white" }} href="/cgu-cgv">
              CGU / CGV
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Link sx={{ color: "white" }} href="/privacy-policy">
              Politique de confidentialité
            </Link>
          </Typography>
        </Grid>

        {/* Colonne 2: Suivez nous */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
            gutterBottom
          >
            Suivez nous:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: isMobile ? 4 : 0,
            }}
          >
            <InstagramIcon sx={{ fontSize: 40, marginRight: 2 }} />
            <FacebookIcon sx={{ fontSize: 40, marginRight: 2 }} />
          </Box>
        </Grid>

        {/* Colonne 3: A propos */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}
            gutterBottom
          >
            A propos:
          </Typography>
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              marginBottom: 1,
              justifyContent: "center",
            }}
          >
            <PhoneIcon sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1" sx={{color: "white"}}>
              04 12 34 56 78
            </Typography>
          </Box>
          <Box sx={{ display: "flex",
              marginBottom: 1,
              justifyContent: "center", }}>
            <EmailIcon sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1" sx={{color: "white"}}>local@saveursaison.com</Typography>
          </Box>
          <Box sx={{ display: "flex",
              marginBottom: isMobile ? 4 : 0,
              justifyContent: "center", }}>
            <LocationOnIcon sx={{ fontSize: 20, marginRight: 1 }} />
            <Typography variant="body1" sx={{color: "white"}}>
              <Link 
                sx={{ color: "white" }} 
                href="https://www.google.fr/maps/place/7+Rue+de+la+Croix+d'Or,+34000+Montpellier/@43.6089524,3.8758014,17z/data=!3m1!4b1!4m6!3m5!1s0x12b6afa70af7be3f:0xccb22e5f71cd6ce4!8m2!3d43.6089485!4d3.8783763!16s%2Fg%2F11c114q_b7?hl=fr&entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"
              >
                7 Rue de la Croix d'Or
              </Link>
            </Typography>
          </Box>
        </Grid>

        {/* Colonne 4: Logo AB Bio */}
        <Grid item xs={12} sm={6} md={3} textAlign="center">
          <Box
            component="img"
            src={Abbio}
            alt="Logo AB Bio"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
