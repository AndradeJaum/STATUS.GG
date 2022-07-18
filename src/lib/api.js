export async function searchByName(nickname, region) {
  const response = await fetch(
    `http://localhost:8000/summoner/${nickname}?region=${region}`
  );
  const summoner = await response.json();
  return summoner;
}

export async function getMatchsByUserId(puuid) {
  const response = await fetch(`http://localhost:8000/matchs/${puuid}`);
  const matchs = await response.json();
  return matchs;
}

export async function getMatch(id) {
  const response = await fetch(`http://localhost:8000/match/${id}`);
  const match = await response.json();
  return match;
}

export async function getRankedMatchs(userId) {
  const response = await fetch(`http://localhost:8000/rankedMatchs/${userId}`);
  const rankedMatchs = await response.json();

  return rankedMatchs;
}

export async function postLeaderboards(body) {
  await fetch(`http://localhost:8000/leaderboards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function getLeaderboards(limit, rankedType) {
  const response = await fetch(
    `http://localhost:8000/leaderboards?limit=${limit}&rankedType=${rankedType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const leaderboards = await response.json();

  return leaderboards;
}
