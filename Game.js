class Game{
    #GetParticipants_(participants) {
       summoners_ = [];
       participants.forEach((participant) => {
         summoners_.push(new Summoner(participant.puuid, participant.summonerName, participant.summonerId, host.GetAPIKey(), participant.spell1Id, participant.spell2Id, participant.teamId, participant.championId));
       })
       return summoners_;
    }
 
    /**
     * 
     * @param {long} gameId 
     * @param {long} mapId 
     * @param {string} gameMode 
     * @param {List[Summoners]} participants 
     * @param {string} platformId 
     * @param {Summoner} host 
     */
    constructor(gameId, mapId, gameMode, participants, platformId, host) {
       this.gameID = gameId;
       this.mapID = mapId;
       this.gameMode = gameMode;
       this.participants = this.#GetParticipants_(participants);
       this.platformId = platformId;
       this.host = host; 
    }
 
    GetGameID() { return this.gameID; }
    GetMapID() { return this.mapID; }
    GetGameMode() { return this.gameMode; }
    GetHose() { return this.host; } 
    GetPlatformId() { return this.platformId; }
 
    GetParticipants() {
       return this.participants;
    }
 
 
 
 
 }
 
 
 export default Game;
