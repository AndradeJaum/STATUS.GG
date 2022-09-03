import { Typography, Box } from "@mui/material";
import theme from "../../../theme/theme.js";

function Games({ lastGames }) {

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        width: "20%",
        marginTop: "6rem",
        padding: "1rem",
        borderRadius: "0.8rem",
        [theme.breakpoints.down("laptop")]: {
          marginTop: "2rem",
          width: "30%"
          },
        [theme.breakpoints.down("tablet")]: {
          width: "60%",
          marginTop: "2rem",
        },
      }}
    >
      <Typography variant="h6" color="secondary" component="h2" align="center">
        ULTIMAS 20 PARTIDAS
      </Typography>
      <Box csx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Winrate: {lastGames.winrate}%
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Vitórias: {lastGames.wins}
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Derrotas: {lastGames.losses}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default Games;
