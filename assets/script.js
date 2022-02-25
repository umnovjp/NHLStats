var scheduleContent = document.getElementById('schedule');
var gameId;
// var movieTitle;
// var object1;
var inputVal = '2021';
// var inputYear = 2021;
const homeRosterArray = [];
const awayRosterArray = [];
//const fs = require('fs');

// two lines below will allow user to search by year
function getInputValue() {
  // var inputVal = document.getElementById('myInput').value;
  var inputVal = document.getElementById('datepicker').value;
  console.log('inputVal= ' + inputVal);

  var date = inputVal.split('/');
  console.log(date);
  var formatted = date[2] + '-' + date[0] + '-' + date[1];
  console.log(formatted)
  var requestURL = 'https://statsapi.web.nhl.com/api/v1/schedule/?date=' + formatted;
  console.log(requestURL);
  fetch(requestURL, {
    "method": "GET", "headers": {
    }
  })

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('I am in schedule then')
      console.log(data.dates[0].games);
      console.log(data.dates[0].games[0].teams.away.leagueRecord);
      var numberOfGames = data.dates[0].games.length;
      // var obj = data.gameData.players;
      // var keys = Object.keys(obj);
      scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) {

        var gameName = document.createElement('button');
        gameName.setAttribute('id', 'game' + i);
        var idx = gameName.getAttribute('id');
        console.log(idx);
        gameName.innerHTML = 'Game ' + i + ': ' + data.dates[0].games[i].teams.away.team.name + ' ' + data.dates[0].games[i].teams.away.leagueRecord.wins + 'W ' + data.dates[0].games[i].teams.away.leagueRecord.losses + 'L ' + data.dates[0].games[i].teams.away.leagueRecord.ot + 'O vs ' + data.dates[0].games[i].teams.home.team.name + ' ' + data.dates[0].games[i].teams.home.leagueRecord.wins + 'W ' + data.dates[0].games[i].teams.home.leagueRecord.losses + 'L ' + data.dates[0].games[i].teams.home.leagueRecord.ot + 'O ';
        document.getElementById('schedule').appendChild(gameName);
        gameName.addEventListener('click', displayGameData);
      }

      function displayGameData(event) {
        idx = event.currentTarget;
        console.log(typeof idx)
        idxString = event.currentTarget.textContent;
        idxArray = idxString.split(':');
        idxNumber = idxArray[0].split(' ');
        console.log(idxNumber);
        gameNumber = idxNumber[1];

        const gameId = data.dates[0].games[gameNumber].gamePk;
        console.log(gameId);
        var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
        fetch(requestURL, {
          "method": "GET", "headers": {
            //   "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
            //   "x-rapidapi-key": "f567ffdbe0msh246ba4a9ef34553p1195c8jsn6e946070d30d"
          }
        })

          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log('I am in second then')
            // console.log(data);
const gameInfo = document.createElement('section');
gameInfo.setAttribute('id', 'gameInfo');
document.getElementById('schedule').appendChild(gameInfo);
            var gameTitle = document.createElement('h2');
            gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching stats for ' + data.gameData.teams.away.name + ' at ' + data.gameData.teams.home.name + ' game';
            document.getElementById('gameInfo').appendChild(gameTitle);
var penaltyButton = document.createElement('button');
penaltyButton.setAttribute('class', 'searchParameter');
penaltyButton.textContent = 'Print Penalties';
document.getElementById('gameInfo').appendChild(penaltyButton);
penaltyButton.addEventListener('click', getPenalties);

var goalButton = document.createElement('button');
goalButton.setAttribute('class', 'searchParameter');
goalButton.textContent = 'Print Goals';
document.getElementById('gameInfo').appendChild(goalButton);
goalButton.addEventListener('click', getGoals);

var rosterButton = document.createElement('button');
rosterButton.setAttribute('class', 'searchParameter');
rosterButton.textContent = 'Print Rosters';
document.getElementById('gameInfo').appendChild(rosterButton);
rosterButton.addEventListener('click', getRoster);

var faceoffButton = document.createElement('button');
faceoffButton.setAttribute('class', 'searchParameter');
faceoffButton.textContent = 'Get faceoffs stats';
document.getElementById('gameInfo').appendChild(faceoffButton);
faceoffButton.addEventListener('click', getFaceoffs);

          });
          function getGoals(event) {
            var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
            fetch(requestURL, {
              "method": "GET", "headers": {
                //   "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
              }
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                var goalTitle = document.createElement('h3');
                goalTitle.setAttribute('id', 'drama');
                goalTitle.innerHTML = 'Goals - shot location figure will be added';
                document.getElementById('gameInfo').appendChild(goalTitle);
                const arrayGoals = [];
          
                for (i = 0; i < data.liveData.plays.scoringPlays.length; i++) {
                  scoringPlay = data.liveData.plays.scoringPlays[i];
                  var newGoal = document.createElement('p');
                  newGoal.innerHTML = 'Period: ' + data.liveData.plays.allPlays[scoringPlay].about.period + ' Time: ' + data.liveData.plays.allPlays[scoringPlay].about.periodTime + ' Score: ' + data.liveData.plays.allPlays[scoringPlay].about.goals.away + ' : ' + data.liveData.plays.allPlays[scoringPlay].about.goals.home + ' Shot Location: ' + data.liveData.plays.allPlays[scoringPlay].coordinates.x + ' : ' + data.liveData.plays.allPlays[scoringPlay].coordinates.y;
                  document.getElementById('gameInfo').appendChild(newGoal);
                  
                  var coordinates = { x : data.liveData.plays.allPlays[scoringPlay].coordinates.x, y : data.liveData.plays.allPlays[scoringPlay].coordinates.y};
                  arrayGoals.push(coordinates);
                  
                  for (j = 0; j < data.liveData.plays.allPlays[scoringPlay].players.length; j++) {
                    var goalEvent = document.createElement('span');
                    
                    goalEvent.innerHTML = 'Name: ' + data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName + ' Type: ' + data.liveData.plays.allPlays[scoringPlay].players[j].playerType;
                    document.getElementById('gameInfo').appendChild(goalEvent);

                    if (data.liveData.plays.allPlays[scoringPlay].players[j].playerType == 'Scorer')
                    { var goal = document.createElement('span');
                    goal.innerHTML = 'G';
                    const scorer = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                    document.getElementById(scorer).appendChild(goal);
                  }
                  else if (data.liveData.plays.allPlays[scoringPlay].players[j].playerType == 'Assist')
                  { var assist = document.createElement('span');
                  assist.innerHTML = 'A';
                  const assistant = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                  document.getElementById(assistant).appendChild(assist);
                }
                else if (data.liveData.plays.allPlays[scoringPlay].players[j].playerType == 'Goalie')
                { var goal = document.createElement('span');
                goal.innerHTML = 'Allowed';
                const Goalie = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                document.getElementById(Goalie).appendChild(goal);
              }
                  }                  
                }
                console.log(arrayGoals);
               
                
              });
          };
          function getPenalties(event) {

            var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
            fetch(requestURL, {
              "method": "GET", "headers": {
                //   "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
                //   "x-rapidapi-key": "f567ffdbe0msh246ba4a9ef34553p1195c8jsn6e946070d30d"
              }
            })
          
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log('I am in second then')
          
                awayTeam1 = data.gameData.teams.away.id;
                homeTeam1 = data.gameData.teams.home.id;
          
                // var awayTeam = document.createElement('p');
                // awayTeam.innerHTML = data.gameData.teams.away.name + ' vs ' + data.gameData.teams.home.name;
                // document.getElementById('input2').appendChild(awayTeam);
                var penaltyTitle = document.createElement('h3');
                penaltyTitle.setAttribute('id', 'drama');
                penaltyTitle.innerHTML = 'Penalties - penalty location figure will be added';
                document.getElementById('gameInfo').appendChild(penaltyTitle);
          
                //   console.log(data.gameData.players.keys);
                var obj = data.gameData.players;
                var keys = Object.keys(obj);
          
                console.log(data.liveData.decisions);
                console.log(data.liveData.linescore);
          
                console.log(data.liveData.plays.allPlays.length);
                console.log(data.liveData.plays.penaltyPlays.length);
                console.log(data.liveData.plays.scoringPlays.length);
          
                for (i = 0; i < data.liveData.plays.penaltyPlays.length; i++) {
                  penaltyPlay = data.liveData.plays.penaltyPlays[i];
                  var penaltyData = document.createElement('p');
          
                  penaltyData.innerHTML = ' Period: ' + data.liveData.plays.allPlays[penaltyPlay].about.period + ' Time: ' + data.liveData.plays.allPlays[penaltyPlay].about.periodTime + ', ' + data.liveData.plays.allPlays[penaltyPlay].result.penaltyMinutes + ' minutes, ' + 'Penalty Location: ' + data.liveData.plays.allPlays[penaltyPlay].coordinates.x + ' : ' + data.liveData.plays.allPlays[penaltyPlay].coordinates.y;
                  document.getElementById('gameInfo').appendChild(penaltyData);
          
                  for (j = 0; j < data.liveData.plays.allPlays[penaltyPlay].players.length; j++) {
                    console.log(data.liveData.plays);
                    var penaltyEvent2 = document.createElement('span');
                    penaltyEvent2.innerHTML = data.liveData.plays.allPlays[penaltyPlay].result.description;
                    document.getElementById('gameInfo').appendChild(penaltyEvent2);
                  }
                }
              });
          }
          function getRoster(event) {
            var genre = event.currentTarget.value;
console.log('u r in get roster');
          
            var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
            fetch(requestURL, {
              "method": "GET", "headers": {
              }
            })
          
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data.gameData.players)
          
                var obj = data.gameData.players;
                var keys = Object.keys(obj);
          
                var awayRoster = document.createElement('h2');
                awayRoster.innerHTML = data.gameData.teams.away.name + ' Roster ';
                awayRoster.setAttribute('id', 'awayTeamId');
                document.getElementById('gameInfo').appendChild(awayRoster);
          
                var homeRoster = document.createElement('h2');
                homeRoster.innerHTML = data.gameData.teams.home.name + ' Roster ';
                homeRoster.setAttribute('id', 'homeTeamId');
                document.getElementById('gameInfo').appendChild(homeRoster);
                const homeRosterArray = [];
                const awayRosterArray = [];
          
                for (var i = 0; i < keys.length; i++) {
                  var val = obj[keys[i]];
          const playerName1 =val.fullName;
          const lastName = val.lastName;
          const primaryNumber1 = val.primaryNumber;
          const tempAttribute = playerName1;
                  var playerName = document.createElement('p');
                  playerName.innerHTML = val.primaryNumber + ' ' + val.fullName + ', ' + val.primaryPosition.code + ' shoots or catches:' + val.shootsCatches + ' ';
                  playerName.setAttribute('id', tempAttribute);
                  if (val.currentTeam.id == data.gameData.teams.away.id) {
                    document.getElementById('awayTeamId').appendChild(playerName);
                    awayRosterArray.push(primaryNumber1);
                    awayRosterArray.push(playerName1);
                  }
                  else if (val.currentTeam.id == data.gameData.teams.home.id) {
                    //    console.log(val.fullName + ' ' + val.currentTeam.name + ' ' + val.currentTeam.id + data.gameData.teams.home.id);
                    document.getElementById('homeTeamId').appendChild(playerName);
                    homeRosterArray.push(primaryNumber1);
                    homeRosterArray.push(playerName1);
                  }                  
                }
                console.log(homeRosterArray);
                console.log(awayRosterArray);
              });
          }
          function getFaceoffs(event) {
            var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/' + gameId + '/feed/live';
            fetch(requestURL, {
              "method": "GET"
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data.liveData.plays);
                console.log(gameId);
          
                for (i = 0; i < data.liveData.plays.allPlays.length; i++) {
                   if (data.liveData.plays.allPlays[i].result.event == 'Faceoff')
          {
            console.log(data.liveData.plays.allPlays[i].result);
          const descript = data.liveData.plays.allPlays[i].result.description
          descriptArray = descript.split(' faceoff');
          descriptArray2 = descriptArray[1].split('against ');
          fullNameWon = descriptArray[0];
          FullNameLost = descriptArray2[1];
        //  console.log(fullNameWon + 'lost ' + FullNameLost);
          var foWin = document.createElement('span');
          var foLoss = document.createElement('span');
          foWin.innerHTML = 'W';
          foLoss.innerHTML= 'L';
          document.getElementById(fullNameWon).appendChild(foWin);
          document.getElementById(FullNameLost).appendChild(foLoss);
                }
              }});
          }
      }}
    );
}




function getShifts(event) {
  // var requestURL = './assets/shiftcharts.json'; // former fetch https://api.nhle.com/stats/rest/en/shiftcharts?cayenneExp=gameId=2021020722
  // fetch(requestURL, {
  //  "mode": "no-cors",
  //  'credentials': 'omit',
  //   "method": "GET", "headers": {
  //    'Content-Type': 'application/json; charset=utf-8',
  //     'Access-Control-Allow-Origin': 'https://www.google.com',
  //  //     'redirect': 'follow',
  // //      'body': 'JSON.stringify(data)'
  //   }
  // })
  fetch('./assets/shiftcharts.json')

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // var obj = data.gameData.players;
      // var keys = Object.keys(obj);

      // var awayRoster = document.createElement('h2');
      // awayRoster.innerHTML = data.gameData.teams.away.name + ' Roster ';
      // awayRoster.setAttribute('id', 'awayTeamId');
      // document.getElementById('input2').appendChild(awayRoster);

      // var homeRoster = document.createElement('h2');
      //   homeRoster.innerHTML = data.gameData.teams.home.name + ' Roster ';
      //   homeRoster.setAttribute('id', 'homeTeamId');
      //   document.getElementById('input2').appendChild(homeRoster);

      // for (var i = 0; i < keys.length; i++) {
      //   var val = obj[keys[i]];

      //   var playerName = document.createElement('p');
      //   playerName.innerHTML = val.fullName + ', ';
      //   if (val.currentTeam.id == data.gameData.teams.away.id) {
      //     document.getElementById('awayTeamId').appendChild(playerName);
      //   }
      //   else if (val.currentTeam.id == data.gameData.teams.home.id) {
      // //    console.log(val.fullName + ' ' + val.currentTeam.name + ' ' + val.currentTeam.id + data.gameData.teams.home.id);
      //     document.getElementById('homeTeamId').appendChild(playerName);
      //   }
      // }
    });
}