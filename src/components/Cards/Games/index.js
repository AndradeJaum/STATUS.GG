import { Typography, Box } from "@mui/material";

function Games({ lastGames }) {

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        width: "20%",
        marginTop: "1.5rem",
        padding: "1rem",
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
