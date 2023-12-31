import Axios from "axios";
import Summoner from "./Summoner.js";



class API {

    /**
     * 
     * @param {string} api_key 
     * @param {string} region 
     */
    constructor(api_key, region) {
        this.api_key = api_key;
        this.region = region;
        this.champion_url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/";
        this.summonerspell_json = "https://ddragon.leagueoflegends.com/cdn/13.24.1/data/en_US/summoner.json";
    }
    

    // Return if the api key is valid by making a request and seeing the output
    async CheckKey() {
        const url = `https://${this.region}.api.riotgames.com/lol/status/v4/platform-data?api_key=${this.api_key}`;
        await Axios.get(url)
        .then(response=> {
            if (response.status === 200) {
                console.log("The key provided works.")
                return true;
            }
        })
        .catch(error => {

            console.log("The key provided does not work.")
            return false;
        });
    }
    
    // Return the api key
    GetAPIKey() {
        return this.api_key;
    }
    GetRegion() {
        return this.region;
    }


    // OUTDATED NEEDS UPDATE
    // Return the summoner object from the given summoner name & id
    async GetAccountByRiotID(name, id) {
        const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${id}?api_key=${this.api_key}`;
        try {
            const response = await Axios.get(url);
            return new Summoner(response.data.tagLine, response.data.gameName, response.data.puuid);
        } catch (error) {
            return null;
        }
    }



    
    // constructor(puuid, name, summID, spell1Id, spell2Id, teamId, championId) {
    // Return the summoner object from the given summoner name
    async GetAccountBySummonerName(name) {
        const url = `https://${this.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${this.api_key}`;
        try {
            const response = await Axios.get(url);
            return new Summoner(response.data.puuid, response.data.name, response.data.id, null, null, null, null);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // Function to find the link to the square images of champions
    async GetChampionSquareImage(champion_name){
        return this.champion_url + champion_name + ".png"; 
    }



    // 0 = Image
    // 1 = Cooldown
    async GetSummonerSpellInfo(option, spell)
    {
        const response = await Axios.get(this.summonerspell_json)
        const spell_ = "Summoner" + spell;
        switch (option) {
            case 0: 
            {
                return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell_}.png` 
            }
            case 1:
            {
                return response.data.data[spell_]["cooldown"][0];
                
            }
            default:
                return null
        }
    }



}

export default API;