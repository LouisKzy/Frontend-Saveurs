import { Typography, Paper } from '@mui/material';

function PrivacyPolicy() {
  return (
    <div>
      <Paper elevation={3} style={{ padding: 100}}>
        <Typography variant="h5" gutterBottom>Politique de Confidentialité</Typography>
        <Typography paragraph>
          Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web.
        </Typography>
        <Typography paragraph>
          <strong>Collecte et utilisation des données :</strong> 
        </Typography>
        <Typography paragraph>
          Nous collectons certaines informations lorsque vous utilisez notre site web, telles que votre nom, votre prénom, votre adresse e-mail. Ces informations sont utilisées pour traiter vos commandes et améliorer votre expérience utilisateur.
        </Typography>
        <Typography paragraph>
          <strong>Cookies :</strong> 
        </Typography>
        <Typography paragraph>
          Nous utilisons des cookies pour améliorer la fonctionnalité de notre site web et pour comprendre comment vous interagissez avec celui-ci. Vous pouvez choisir de désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités de notre site.
        </Typography>
        <Typography paragraph>
          <strong>Partage des données :</strong> 
        </Typography>
        <Typography paragraph>
        Nous ne partageons pas vos informations personnelles avec des tiers sans votre consentement, sauf dans les cas où cela est nécessaire pour fournir nos services ou lorsque la loi l&apos;exige.
        </Typography>
        <Typography paragraph>
          <strong>Sécurité des données :</strong> 
        </Typography>
        <Typography paragraph>
          Nous prenons des mesures pour protéger vos informations personnelles contre la perte, le vol et l&apos;accès non autorisé. Cependant, veuillez noter qu&apos;aucune méthode de transmission ou de stockage de données n&apos;est totalement sécurisée.
        </Typography>
        <Typography paragraph>
          <strong>Modification de la politique :</strong>
        </Typography>
        <Typography paragraph>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page.
        </Typography>
      </Paper>
    </div>
  );
}

export default PrivacyPolicy;