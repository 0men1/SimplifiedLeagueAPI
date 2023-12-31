import 'dotenv/config'
import API from './API.js'
import Summoner from './Summoner.js'
import Game from './Game.js'

const api = new API(process.env.KEY, 'na1');
await api.CheckKey();
