
const apiKey = "RGAPI-e9389fdd-cba0-4edd-8886-61ca4e58a254"


 async function searchByName(nickname, region) {
    const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}`,{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Origin': "https://developer.riotgames.com/",
            "X-Riot-Token": apiKey
        }
    })
    
    const summoner = await response.json();

    console.log(summoner)
}
searchByName("osteoposose", "br1")