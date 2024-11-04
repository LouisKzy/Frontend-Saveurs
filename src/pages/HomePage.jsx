import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import welcomeImage from "../assets/images/welcomeF.svg";
import Abbio from "../assets/images/Abbio.svg";
import Logo from "../assets/images/LogoHome.png";
import RondLoc from "../assets/images/RondLoc.svg";
import RondThunder from "../assets/images/RondThunder.svg";
import RondVelo from "../assets/images/RondVelo.svg";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Box>
        {/* Section Header */}
        <Box
          sx={{
            height: "100vh",
            backgroundImage: `url(${welcomeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Grid container spacing={4} sx={{ margin: 1 }}>
            {/* Colonne 1: Logo et bouton de connexion */}
            <Grid
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* Logo */}
              <Grid
                xs={6}
                md={4}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Box
                  component="img"
                  src={Logo}
                  alt="Logo"
                  sx={{
                    width: isMobile ? "125px" : "200px",
                  }}
                />
              </Grid>

              {/* Bouton de connexion */}
              <Grid
                item
                xs={6}
                md={4}
                sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      m: 1,
                      bgcolor: "#FFFFFF",
                      color: "black",
                      "&:hover": { bgcolor: "#E5E5E5" },
                    }}
                  >
                    Se connecter
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      m: 1,
                      bgcolor: "#FFFFFF",
                      color: "black",
                      "&:hover": { bgcolor: "#E5E5E5" },
                    }}
                  >
                    S'inscrire
                  </Button>
                </Link>
              </Grid>
            </Grid>

            {/* Colonne 2: Titre */}
            <Grid
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Grid xs={10} md={10} padding={5} sx={{ textAlign: "center" }}>
                <Typography
                  variant={isMobile ? "h2" : "h1"}
                  sx={{ color: "#FFFFFF" }}
                >
                  Commandez des fruits et légumes frais en quelques clics.
                </Typography>
              </Grid>
            </Grid>

            {/* Colonne 3: Boutons */}
            <Grid
              xs={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={5}
                md={4}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Button
                  disableRipple
                  variant="contained"
                  sx={{
                    bgcolor: "#FFFFFF",
                    color: "black",
                    "&:hover": {
                      bgcolor: "#FFFFFF",
                      cursor: "default",

                    }
                  }}
                >
                  VOTRE PANIER PRÊT À RETIRER EN 1H
                </Button>
              </Grid>

              <Grid
                xs={5}
                md={4}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  disableRipple
                  sx={{
                    bgcolor: "#FFFFFF",
                    "&:hover": {
                      bgcolor: "#FFFFFF",
                      cursor: "default",

                    },
                    color: "black",

                  }}
                >
                  DIRECTEMENT CHEZ VOTRE PRIMEUR
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        {/* Process steps */}
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{mt: 10}}
        >
          <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
            <Box>
              <LocationOnIcon sx={{ fontSize: 80, color: "#8B1D1D" }} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
              1. Je repère mon primeur
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
            <Box>
              <PaymentIcon sx={{ fontSize: 80, color: "#8B1D1D" }} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
              2. Je commande et paye en ligne
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
            <Box>
              <ShoppingCartIcon sx={{ fontSize: 80, color: "#8B1D1D" }} />
            </Box>
            <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
              3. Ma commande prête en 1h
            </Typography>
          </Grid>
        </Grid>

        {/* Advantages section */}
        <Box textAlign="center" sx={{ mt: 8 }}>
          <Typography variant="h2" sx={{ color: "#8B1D1D" }}>
            Les avantages d’une commande chez Saveurs Saisonnières
          </Typography>
        </Box>
      </Box>

      <Grid
        container
        alignItems="center"
        justifyContent="center"
        spacing={4}
        sx={{ mt: 4 }}
      >
        <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
          <Box
            component="img"
            src={RondVelo}
            alt="Produit frais et local"
            sx={{ width: 100 }}
          />
          <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
            Produit frais
            <br />
            et local
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
          <Box
            component="img"
            src={RondLoc}
            alt="Relation de proximité"
            sx={{ width: 100 }}
          />
          <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
            Relation de proximité,
            <br />
            moins de pollution
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{mt: 5}} textAlign="center">
          <Box
            component="img"
            src={RondThunder}
            alt="Rapidité de préparation"
            sx={{ width: 100 }}
          />
          <Typography variant="body1" sx={{ mt: 2, color: "#C0CA33" }}>
            Rapidité de
            <br />
            préparation
          </Typography>
        </Grid>
      </Grid>

      {/* Fin de la page */}
      <Box textAlign="center" sx={{ mt: 12, mb: 6 }}>
        <Typography variant="h2" sx={{ color: "#8B1D1D" }}>
          Venez découvrir Saveurs Saisonnières en magasin, pour plus de
          proximité
        </Typography>

        <Button
          variant="contained"
          href="https://www.google.fr/maps/place/7+Rue+de+la+Croix+d'Or,+34000+Montpellier/@43.6089524,3.8758014,17z/data=!3m1!4b1!4m6!3m5!1s0x12b6afa70af7be3f:0xccb22e5f71cd6ce4!8m2!3d43.6089485!4d3.8783763!16s%2Fg%2F11c114q_b7?hl=fr&entry=ttu&g_ep=EgoyMDI0MTAxMy4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          sx={{color: '#fff'}}
        >
          Notre Localisation
        </Button>

      </Box>
    </Box>
  );
}

export default HomePage;
