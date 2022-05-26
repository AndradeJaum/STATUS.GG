import { Typography, Box } from "@mui/material";

function Leaderboards() {

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        width: "10%",
        padding: "1rem",
        textAlign: "center",
        marginRight: "20px"
    }}
    >
      <Typography variant="h6" color="secondary" component="h2" align="center">
        Leaderboards
      </Typography>
      <Box csx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
           Caba 1
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
           Caba 2
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            caba 3
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            caba 4
          </Typography>

          <Typography sx={{ marginTop: "0.7rem", marginBottom: "0.7rem", display: "block" }}>
            caba 5
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default Leaderboards;
