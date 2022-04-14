import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useState } from "react";
import { searchByName, getMatchsByUserId, getMatch, getRankedMatchs } from "./lib/api.js";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
    secondary: {
      light: "#34495e",
      main: "#3498db",
      dark: "#233544",
    },
  },
});

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  tittle: {
    
  },
  back: {
    backgroundColor: "#34495e",
    height: "100vh",
  },
  box: {
    backgroundColor: "#233544",
    marginBottom: 40,
    padding: 40
  },
  boxForm: {
    backgroundColor: "#fafafa",
    width: "25%",
    padding: 40,
    margin: "auto",
  },
});

export function App() {
  const classes = useStyles();

  const [summonerName, setSummonerName] = useState("");
  const [ id, setId] = useState("");
  const [winrate, setWinrate] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState({ nickname: false });
  const [winSolo, setWinSolo] = useState("");
  const [losesSolo, setLosesSolo] = useState("");
  const [winFlex, setWinFlex] = useState("");
  const [losesFlex, setLosesFlex] = useState("");


  async function data() {
    const summoner = await searchByName(nickname);
    const matchsIds = await getMatchsByUserId(summoner.puuid);
    const rankedMatchs = await getRankedMatchs(summoner.id)
    setSummonerName(summoner.name);
    setId(summoner.id);

    console.log(rankedMatchs)
    console.log(id)

    async function rank() {

      if(rankedMatchs) {
        if(rankedMatchs[0] && rankedMatchs[1]) {
          setWinSolo(rankedMatchs[0].wins)
          setLosesSolo(rankedMatchs[0].losses)
          setWinFlex(rankedMatchs[1].wins)
          setLosesFlex(rankedMatchs[1].losses)
        }
      }      
    }
    
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
    setWinrate((wins * 100) / matchsIds.length);
  }

  function validate(input) {
    if (input.name === "nickname") {
      setError(false)
      if (input.value.length < 3) {
        setError((error) => ({
          ...error,
          nickname: true,
        }));
      }
    }
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      data();
    }
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box className={classes.back}>
          <Box className={classes.box}>
            <Typography
              className={classes.tittle}
              variant="h2"
              color="primary"
              component="h2"
              align="center"            
            >
              STATUS.GG
            </Typography>
          </Box>

          <Box className={classes.boxForm}>
            <Typography
              variant="h6"
              color="secondary"
              component="h2"
              align="center"
              gutterBottom
            >
              INSIRA O NOME DE INVOCADOR!
            </Typography>

            <form
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                onChange={(event) => setNickname(event.target.value)}
                className={classes.field}
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

              <TextField
                className={classes.field}
                label="Região"
                variant="outlined"
                color="secondary"
                fullWidth                
              />

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Pesquisar
              </Button>
              <p>{summonerName}</p>
              <p>{winrate}</p>
              <p>SoloDuo</p>
              <p>wins:{winSolo}</p>
              <p>loses: {losesSolo}</p>
              <p>Flex</p>
              <p>wins: {winFlex}</p>
              <p>loses: {losesFlex}</p>
            </form>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
