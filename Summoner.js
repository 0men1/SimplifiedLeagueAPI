import Axios from 'axios';
// import API from './API.js'


// Class to hold summoner information
class Summoner {
    /**
     * 
     * @param {string} puuid 
     * @param {string} name 
     * @param {string} summID 
     * @param {long} spell1Id
     * @param {long} spell2Id
     * @param {long} teamId    
     * @param {long} championId
     *   
    */
    constructor(puuid, name, summID, spell1Id, spell2Id, teamId, championId) {
        this.summID = summID;
        this.summonerName = name;
        this.puuid = puuid;
        this.spell1Id = spell1Id;
        this.spell2Id = spell2Id;
        this.teamId = teamId;
        this.championId = championId; 
    }

    
    GetSpell1Id() {
        return this.spell1Id;
    }
    GetSpell2Id() {
        return this.spell2Id;
    }
    GetTeamId() {
        return this.teamId;
    }
    GetSummID() {
        return this.summID;
    }
    GetGameName() {
        return this.summonerName;
    }
    GetPuuid() {
        return this.puuid;
    }

    /**
     * 
     * @returns an array of match ids that the summoner has played in the last 20 games. The amount of the games displayed can be changed.
     */
    async GetMatches(API) {
        const url = `https://${API.GetRegion()}.api.riotgames.com/lol/match/v5/matches/by-puuid/${this.puuid}/ids?start=0&count=20&api_key=${API.GetAPIKey()}`;

        try {
            const response = await Axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * 
     * @returns a match object which holds the match data that the summoner is currently in. If the summoner is not in a game it will return 401 not found so we return null if it does not work.
     */
    async GetCurrentMatch(API) {
        const url = `https://${API.GetRegion()}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${this.summID}?api_key=${API.GetAPIKey()}`;
         
        try {
            const response = await Axios.get(url);
            console.log("Player is in a game!"); 
            return response.data;       
        } catch (error) {
            return null;
        }
    }

    

}

export default Summoner;