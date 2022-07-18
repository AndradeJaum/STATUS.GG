import {
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { getLeaderboards } from "../../../lib/api";
import { useState, useEffect } from "react";

function Leaderboards({ summoner }) {
  const [leaderboards, setLeaderboards] = useState([]);
  const [limit, setLimit] = useState(5);
  const [rankedType, setRankedType] = useState("rankedSolo");

  async function fetchLeaderboards() {
    const leaderboardsData = await getLeaderboards(limit, rankedType);
    setLeaderboards(leaderboardsData);
  }

  useEffect(() => {
    if (rankedType) {
      fetchLeaderboards();
    }
  }, [rankedType, summoner]);

  const handleChange = (event, rankedTypeInput) => {
    setRankedType(rankedTypeInput);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
        width: "15%",
        padding: "1rem",
        textAlign: "center",
        marginRight: "20px",
      }}
    >
      <Typography variant="h6" color="secondary" component="h2" align="center">
        Leaderboards
      </Typography>

      <ToggleButtonGroup
        color="secondary"
        value={rankedType}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="rankedSolo" sx={{ height: "0.7rem" }}>
          SOLO
        </ToggleButton>
        <ToggleButton value="rankedFlex" sx={{ height: "0.7rem" }}>
          FLEX
        </ToggleButton>
      </ToggleButtonGroup>

      <Box csx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {leaderboards.length > 0 &&
            leaderboards.map((leaderboard, i) => {
              const name = leaderboard.summonerName;

              return (
                <Typography
                  key={name}
                  sx={{
                    marginTop: "0.7rem",
                    marginBottom: "0.7rem",
                    display: "block",
                  }}
                >
                  {i + 1} - {name} : {leaderboard.stats.winrate}%
                </Typography>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}
export default Leaderboards;
