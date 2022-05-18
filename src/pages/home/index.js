import { useState, useEffect } from "react";
import { searchByName, getMatchsByUserId, getRankedMatchs, getMatch } from "../../lib/api";
import { Box, Button, Select, TextField, Typography, MenuItem, LinearProgress } from "@mui/material";
import SimpleBackdrop from "../../components/Backdrop";
import Games from "../../components/Cards/Games";
import Card from "../../components/Cards/GamesRankeds";
import { regioes } from "../../enum";

export function Home() {
  const [summonerName, setSummonerName] = useState("");
  const [id, setId] = useState("");
  const [region, setRegions] = useState("");
  const [last20Games, setLast20Games] = useState({});
  const [rankedSolo, setRankedSolo] = useState({});
  const [rankedFlex, setRankedFlex] = useState({});
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState({ nickname: false });
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(101);

  async function data() {
    const summoner = await searchByName(nickname, region);
    const matchsIds = await getMatchsByUserId(summoner.puuid);
    const rankedMatchs = await getRankedMatchs(summoner.id);
    setSummonerName(summoner.name);
    setId(summoner.id);

    async function rank() {
      const rankedSolo = rankedMatchs.find(
        (i) => i.queueType === "RANKED_SOLO_5x5"
      );
      const rankedFlex = rankedMatchs.find(
        (i) => i.queueType === "RANKED_FLEX_SR"
      );

      const solo = {
        winrate: "",
        wins: "",
        losses: "",
        matchsAmount: "",
      };
      const flex = {
        winrate: "",
        wins: "",
        losses: "",
        matchsAmount: "",
      };

      if (rankedMatchs) {
        if (rankedSolo) {
          solo.wins = rankedSolo.wins;
          solo.losses = rankedSolo.losses;
        }
        if (rankedFlex) {
          flex.wins = rankedFlex.wins;
          flex.losses = rankedFlex.losses;
        }
        solo.matchsAmount = solo.wins + solo.losses;
        flex.matchsAmount = flex.wins + flex.losses;

        solo.winrate = ((solo.wins * 100) / solo.matchsAmount).toFixed();
        flex.winrate = ((flex.wins * 100) / flex.matchsAmount).toFixed();

        setRankedSolo(solo);
        setRankedFlex(flex);
      }
    }
    rank();

    const games = {
      winrate: "",
      wins: "",
      losses: "",
    };

    let loses = 0;
    let wins = 0;

    await Promise.all(
      matchsIds.map(async (matchId) => {
        let match = await getMatch(matchId);
        const participants = match.info.participants;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    resetStats();
    setLoader(true);
    setProgress(100);
    data();
  };

  useEffect(() => {
    if (last20Games.winrate) {
      setLoader(false);
    }
  }, [last20Games]);

  useEffect(() => {
    if (progress <= 100) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          
          if (oldProgress - 2 < 0) {
            return 101;
          }
          const diff = 2;
          return Math.max(oldProgress - diff, 0);
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [progress]);


  return (
    <div>
      <Box sx={{ backgroundColor: "#34495e", height: "100vh" }}>
        <Box
          sx={{
            backgroundColor: "#233544",
            marginBottom: "2rem",
            padding: "2rem",
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            component="h2"
            align="center"
          >
            STATUS.GG
          </Typography>
        </Box>

        <SimpleBackdrop open={loader} />

        <Box
          sx={{
            backgroundColor: "#fafafa",
            width: "30%",
            padding: "1.5rem",
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            color="secondary"
            component="h2"
            align="center"
          >
            INSIRA O NOME DE INVOCADOR!
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
              color="secondary"
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
        {last20Games.winrate && (
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Games lastGames={last20Games} />
            <Card queueStats={rankedSolo} rankedType="RANQUEADA SOLO/DUO" />
            <Card queueStats={rankedFlex} rankedType="RANQUEADA FLEX" />
          </Box>
        )}
      </Box>
    </div>
  );
}
export default Home;
