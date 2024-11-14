import { Typography } from "@mui/material";

function NotFoundPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Typography variant="h1" align="center" color="error">
        404 Page Not Found
      </Typography>
    </div>
  );
}

export default NotFoundPage;
