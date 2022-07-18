import { Typography, Box } from "@mui/material";

function Card({ queueStats, rankedType, elo }) {
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
        {rankedType}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Partidas: {queueStats.matchsAmount}
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Winrate: {queueStats.winrate}%
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Vitórias: {queueStats.wins}
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Derrotas: {queueStats.losses}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            {elo.tier} {elo.rank}
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            Campeões aqui
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default Card;
