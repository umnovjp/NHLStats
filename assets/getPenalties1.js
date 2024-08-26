const axios = require('axios');

function getPenalties1() {}
          getPenalties1.prototype.buildUrl= function(gameId) {
            return `https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`;
          }
          getPenalties1.prototype.search=function(gameId) {
            return axios.get(this.buildUrl(gameId))
          }
module.exports=getPenalties1;