export async function searchByName(nickname, region) {
  const response = await fetch(
    `http://localhost:8000/summoner/${nickname}?region=${region}`
  );
  const summoner = await response.json();
  return summoner;
}

export async function getMatchsByUserId(id) {
  const response = await fetch(`http://localhost:8000/matchs/${id}`);
  const matchs = await response.json();
  return matchs;
}

export async function getMatch(id) {
  const response = await fetch(`http://localhost:8000/match/${id}`);
  const match = await response.json();
  return match;
}

export async function getRankedMatchs(id) {
  const response = await fetch(`http://localhost:8000/rankedMatchs/${id}`);
  const rankedMatchs = await response.json();

  return rankedMatchs;
}

export async function postLeaderboards({body}) {
  const response = await fetch(`http://localhost:8000/leaderboards`, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body
  });
  const leaderboards = await response.json();

  return leaderboards;
}
