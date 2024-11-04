import { TextField, Box, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles"; 
import { useMediaQuery } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const searchInputRef = useRef();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4, mt:4  }}>
      <TextField
        label="Rechercher un produit"
        variant="outlined"
        fullWidth
        sx={{ maxWidth: 600, mr: 2 , mt: 2}}
        inputRef={searchInputRef}
      />
      <IconButton
        sx={{
          transition:'transform 0.8s',
          mt: 2,
          "&:hover": {
            backgroundColor: "transparent",
            transform: 'scale(1.4)',
          }
        }}
        size={isMobile ? "small" : "medium"}
        aria-label="Rechercher"
        onClick={() => onSearch(searchInputRef.current.value)}
      >
        <Search sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
