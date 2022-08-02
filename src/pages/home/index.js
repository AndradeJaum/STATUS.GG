import { useState, useEffect } from "react";
import {
  searchByName,
  getMatchsByUserId,
  getMatch,
  postLeaderboards,
} from "../../lib/api";
import {
  Box,
  Button,
  Select,
  TextField,
  Typography,
  MenuItem,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import SimpleBackdrop from "../../components/Backdrop";
import Games from "../../components/Cards/Games";
import Card from "../../components/Cards/GamesRankeds";
import Leaderboards from "../../components/Cards/Leaderboards";
import { regioes } from "../../enum";
import { useCooldown } from "../../hooks/useCooldown";
import background from "../../images/background.png";
import { display } from "@mui/system";

export function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [region, setRegions] = useState("");
  const [last20Games, setLast20Games] = useState({});
  const [rankedSolo, setRankedSolo] = useState({});
  const [rankedFlex, setRankedFlex] = useState({});
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState({ nickname: false });
  const [apiError, setApiError] = useState(false);
  const [loader, setLoader] = useState(false);

  const [progress, setProgress, saveLocalStorage] = useCooldown();

  async function data() {
    try {
      const summoner = await searchByName(nickname, region);
      const matchsIds = await getMatchsByUserId(summoner.puuid);
      setRankedSolo(summoner["RANKED_SOLO_5x5"]);
      setRankedFlex(summoner["RANKED_FLEX_SR"]);

      await postLeaderboards({
        summonerName: summoner.name,
        summonerId: summoner.id,
        solo: summoner["RANKED_SOLO_5x5"],
        flex: summoner["RANKED_FLEX_SR"],
      });

      setSummonerName(summoner.name);

      const games = {
        winrate: "",
        wins: "",
        losses: "",
      };

      let loses = 0;
      let wins = 0;

      await Promise.all(
        matchsIds.map(async (matchId) => {
          const { matchDetail } = await getMatch(matchId);
          const participants = matchDetail.info.participants;
          for (let i = 0; i < participants.length; i++) {
            if (participants[i].summonerName === summoner.name) {
              participants[i].win ? wins++ : loses++;
            }
          }
        })
      );
      games.wins = wins;
      games.losses = loses;
      games.winrate = (games.wins * 100) / matchsIds.length;
      setLast20Games(games);
    } catch (error) {
      resetStats();
      setLoader(false);
      setApiError(true);
    }
  }

  function validate(input) {
    if (input.name === "nickname") {
      setError(false);
      if (input.value.length < 3) {
        setError((error) => ({
          ...error,
          nickname: true,
        }));
      }
    }
  }

  function resetStats() {
    setLast20Games({});
    setRankedSolo({});
    setRankedFlex({});
  }

  function handleSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setApiError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    resetStats();
    setLoader(true);
    setProgress(100);
    saveLocalStorage();
    data();
  };

  useEffect(() => {
    if (last20Games.winrate) {
      setLoader(false);
    }
  }, [last20Games]);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${background}) `,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3498db",
            height: "10%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              color="primary"
              fontWeight={800}
              align="center"
            >
              Status.GG
            </Typography>
          </Box>
        </Box>

        <SimpleBackdrop open={loader} />

        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2.5rem",
          }}
        >
          <Box
            sx={{
              width: "15%",
              marginLeft: "2rem",
              borderRadius: "0.8rem"
            }}
          ></Box>

          <Box
            sx={{
              backgroundColor: "#fafafa",
              width: "30%",
              padding: "1rem",
              borderRadius: "0.8rem"
            }}
          >
            <Typography variant="h6" color="secondary" align="center">
              Insira o nome de Invocador!
            </Typography>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={(event) => setNickname(event.target.value)}
                sx={{
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  display: "block",
                }}
                name="nickname"
                label="Invocador"
                variant="outlined"
                color="secondary"
                value={nickname}
                error={error.nickname}
                onBlur={(event) => validate(event.target)}
                required
                fullWidth
              />

              <Select
                label="Região"
                sx={{
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  display: "block",
                }}
                value={region}
                onChange={(event) => setRegions(event.target.value)}
                variant="outlined"
                color="primary"
                fullWidth
              >
                {regioes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <Button
                disabled={progress < 100}
                className="search"
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Pesquisar
              </Button>

              {progress <= 100 && (
                <LinearProgress
                  color="secondary"
                  variant="determinate"
                  value={progress}
                />
              )}
            </form>
          </Box>
          <Leaderboards summoner={summonerName}/>
        </Box>
        {last20Games.winrate && (
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Games lastGames={last20Games} />
            <Card
              queueStats={rankedSolo}
              rankedType="RANKED SOLO"
              elo={{ rank: rankedSolo.rank, tier: rankedSolo.tier }}
            />
            <Card
              queueStats={rankedFlex}
              rankedType="RANKED FLEX"
              elo={{ rank: rankedFlex.rank, tier: rankedFlex.tier }}
            />
          </Box>
        )}
      </Box>
      <Snackbar
        open={apiError}
        autoHideDuration={4000}
        onClose={handleSnackBar}
      >
        <Alert onClose={handleSnackBar} severity="error" sx={{ width: "100%" }}>
          "Internal Error"
        </Alert>
      </Snackbar>
    </>
  );
}
export default Home;
