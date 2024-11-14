import { Typography, Paper } from '@mui/material';

function CguCgv() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        elevation={3}
        style={{
          padding: 15,
          marginBottom: '20px',
          marginTop: '20px',
          maxWidth: '800px', 
          width: '86%',
          textAlign: 'left',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Conditions générales d&apos;utilisation 
        </Typography>
        <Typography paragraph>
          <strong>Nom de l&apos;entreprise :</strong> Saveurs-saisonnières
        </Typography>
        <Typography paragraph>
          <strong>Objectif principal du site ou du service :</strong> Commande de produits alimentaires en ligne.
        </Typography>
        <Typography paragraph>
          <strong>Conditions d&apos;utilisation :</strong>
          <ul>
            <li>
              Les utilisateurs doivent accepter l&apos;utilisation de cookies nécessaires au fonctionnement de
              l&apos;application.
            </li>
            <li>
              Les utilisateurs conservent leurs droits sur les informations qu&apos;ils ont saisies sur le site (nom,
              prénom, email, mot de passe).
            </li>
          </ul>
        </Typography>
        <Typography paragraph>
          <strong>Politique en matière de propriété intellectuelle :</strong> Saveurs-saisonnières est une marque déposée.
          Tous droits réservés.
        </Typography>
        <Typography paragraph>
          <strong>Litiges et violations des conditions d&apos;utilisation :</strong> Tout litige ou violation des
          conditions d&apos;utilisation sera traité conformément à la législation en vigueur.
        </Typography>
      </Paper>

      <Paper
        elevation={3}
        style={{
          padding: 20,
          marginBottom: '20px',
          maxWidth: '800px',
          width: '86%', 
          textAlign: 'left',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Conditions Générales de Vente
        </Typography>
        <Typography paragraph>
          <strong>Produits ou services proposés à la vente :</strong> Fruits, légumes, paniers de fruits et légumes.
        </Typography>
        <Typography paragraph>
          <strong>Prix et modalités de paiement :</strong> Les prix varient de 1.5€ à 50€ par pièce. Les modalités de
          paiement acceptées sont gérées par Stripe.
        </Typography>
        <Typography paragraph>
          <strong>Conditions de livraison ou de prestation des services :</strong> Le client doit venir chercher sa
          commande à une adresse spécifiée en ville.
        </Typography>
        <Typography paragraph>
          <strong>Politiques de retour et de remboursement :</strong> Aucun remboursement n&apos;est possible sur les fruits et légumes.
        </Typography>
        <Typography paragraph>
          <strong>Garanties offertes sur les produits ou services :</strong> Les produits sont certifiés bio, garantissant leur qualité et fraîcheur.
        </Typography>
        <Typography paragraph>
          <strong>Litiges liés à des transactions commerciales :</strong> Les litiges liés à des transactions commerciales sont traités par Stripe.
        </Typography>
      </Paper>
    </div>
  );
}

export default CguCgv;
