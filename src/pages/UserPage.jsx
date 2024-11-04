import { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Pagination,
} from "@mui/material";
import { ShowUser, UpdateUser, DeleteUser } from "../services/userService";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSnackbar } from "../components/SnackbarAlertProvider";
import Loader from '../components/Loader';

function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [currentOrdersPage, setCurrentOrdersPage] = useState(1);
  const ordersPerPage = 10;

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const openSnackbar = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const startTime = Date.now();
        const response = await ShowUser();
        setUser(response);

        const elapsed = Date.now() - startTime;
        const minLoadingTime = 2000;

        if (elapsed < minLoadingTime) {
          setTimeout(() => {
            setIsLoading(false);
          }, minLoadingTime - elapsed);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ?"
    );
    if (confirmDelete) {
      try {
        await DeleteUser(userId);
        dispatch(logout());
        window.location.href = "/";
      } catch (error) {
        setError(
          "Échec de la suppression de l'utilisateur : " + error.message
        );
      }
    }
  };

  const handleUpdateUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Veuillez saisir une adresse email valide.");
      openSnackbar("Veuillez saisir une adresse email valide.", "error");
      return;
    }

    try {
      setIsLoading(true); // Commence le chargement

      const updatedData = {
        email: user.email,
      };
      await UpdateUser(user.id, updatedData);
      const refreshedUser = await ShowUser();
      setUser(refreshedUser);
      openSnackbar("Votre email a été mis à jour avec succès.", "success");
    } catch (error) {
      setError("Échec de la mise à jour de l'email : " + error.message);
      openSnackbar("Échec de la mise à jour de l'email.", "error");
    } finally {
      setIsLoading(false); // Termine le chargement
    }
  };

  // Afficher l'erreur si elle existe
  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Vérifier si l'utilisateur est chargé
  if (!user) {
    return null;
  }

  // Calculer les index pour la pagination
  const indexOfLastOrder = currentOrdersPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = user.orders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  return (
    <>
      <Loader isLoading={isLoading} minLoadingTime={500} />
      <Box
        sx={{
          padding: { xs: 2, md: 10 },
          width: "100%",
          maxWidth: isMobile ? "90%" : "80%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          textAlign={isMobile ? "center" : "left"}
          component="h3"
          gutterBottom
        >
          Mes informations
        </Typography>
        {user && (
          <div
            style={{
              maxWidth: isMobile ? "85%" : "600px",
              marginBottom: "20px",
            }}
          >
            <TextField
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                justifyContent: isMobile ? "center" : "space-between",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 1, mr: 1 }}
                onClick={handleUpdateUser}
              >
                Modifier
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteUser(user.id)}
                sx={{ mt: 1 }}
              >
                Suppression du compte
              </Button>
            </Box>
          </div>
        )}
        <Typography
          variant={isMobile ? "h4" : "h3"}
          gutterBottom
          sx={{ mt: 3 }}
        >
          Mes commandes
        </Typography>
        {user && user.orders.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ mt: 0 }}>
              <Table
                sx={{ minWidth: isMobile ? 300 : 650 }}
                aria-label="Mes commandes"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-root": { backgroundColor: "#7B1FA2" },
                    }}
                  >
                    <TableCell align="center" sx={{ color: "white" }}>
                      Numéro de commande
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Date
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Coût
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentOrders.map((order, index) => (
                    <TableRow
                      key={order.id}
                      sx={{
                        backgroundColor:
                          index % 2 === 0 ? "white" : "#f5f5f5",
                      }}
                    >
                      <TableCell align="center" sx={{ width: "25%" }}>
                        {order.id}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "50%" }}>
                        {format(new Date(order.created_at), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell align="center" sx={{ width: "25%" }}>
                        {order.total_price} €
                      </TableCell>

                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Pagination */}
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Pagination
                count={Math.ceil(user.orders.length / ordersPerPage)}
                page={currentOrdersPage}
                onChange={(event, value) => {
                  setCurrentOrdersPage(value);
                }}
                color="secondary"
              />
            </Box>
          </>
        ) : (
          <Typography variant="body1" gutterBottom>
            Aucune commande trouvée.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default UserPage;
