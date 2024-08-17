var scheduleContent = document.getElementById('schedule');
var gameId; var idAwayTeam; var idHomeTeam;
var inputVal = '2021';
const homeRosterArray = [];
const awayRosterArray = [];
//const fs = require('fs');
var rosterArray;

// two lines below will allow user to search by year
function getInputValue() {
  // var inputVal = document.getElementById('myInput').value;
  var inputVal = document.getElementById('datepicker').value;
  console.log('inputVal= ' + inputVal);

  var date = inputVal.split('/');
  console.log(date);
  var formatted = date[2] + '-' + date[0] + '-' + date[1];
  console.log(formatted)
  //'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  var requestURL = 'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
  console.log(requestURL);
  fetch(requestURL, { "method": "GET", "headers": {
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('I am in schedule then')
      console.log(data.gameWeek[0].games);
    //  console.log(data.gameWeek[0].games[0].teams.away.leagueRecord);
      var numberOfGames = data.gameWeek[0].games.length;
      // var obj = data.gameData.players;
      // var keys = Object.keys(obj);
      scheduleContent.textContent = '';
      for (var i = 0; i < numberOfGames; i++) {

        var gameName = document.createElement('button');
        gameName.setAttribute('id', 'game' + i);
        var idx = gameName.getAttribute('id');
        // console.log(idx);
        // gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' ' + data.gameWeek[0].games[i].teams.away.leagueRecord.wins + 'W ' + data.dates[0].games[i].teams.away.leagueRecord.losses + 'L ' + data.dates[0].games[i].teams.away.leagueRecord.ot + 'O vs ' + data.dates[0].games[i].teams.home.team.name + ' ' + data.dates[0].games[i].teams.home.leagueRecord.wins + 'W ' + data.dates[0].games[i].teams.home.leagueRecord.losses + 'L ' + data.dates[0].games[i].teams.home.leagueRecord.ot + 'O ';
        gameName.innerHTML = 'Game ' + i + ': ' + data.gameWeek[0].games[i].awayTeam.abbrev + ' vs ' + data.gameWeek[0].games[i].homeTeam.abbrev;
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

        const gameId = data.gameWeek[0].games[gameNumber].id;
        console.log(gameId);
          //'https://cors-anywhere.herokuapp.com/https://api-web.nhle.com/v1/schedule/' + formatted;
        var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
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
            console.log(data);
            idAwayTeam = data.awayTeam.id;
            idHomeTeam = data.homeTeam.id;
            const gameInfo = document.createElement('section');
            gameInfo.setAttribute('id', 'gameInfo');
            document.getElementById('schedule').appendChild(gameInfo);
            const gameInfoHome = document.createElement('section');
            gameInfoHome.setAttribute('id', 'gameInfoHome');
            document.getElementById('schedule').appendChild(gameInfoHome);
            const gameInfoAway = document.createElement('section');
            gameInfoAway.setAttribute('id', 'gameInfoAway');
            document.getElementById('schedule').appendChild(gameInfoAway);
            var gameTitle = document.createElement('h2');
            gameTitle.textContent = '';
            gameTitle.innerHTML = 'You are watching stats for ' + data.awayTeam.abbrev + ' at ' + data.homeTeam.abbrev + ' game';
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

            var blockedButton = document.createElement('button');
            blockedButton.setAttribute('class', 'searchParameter');
            blockedButton.textContent = 'Print Blocked Shots';
            document.getElementById('gameInfo').appendChild(blockedButton);
            blockedButton.addEventListener('click', getBlockedShots);

            var missedButton = document.createElement('button');
            missedButton.setAttribute('class', 'searchParameter');
            missedButton.textContent = 'Print Missed Shots';
            document.getElementById('gameInfo').appendChild(missedButton);
            missedButton.addEventListener('click', getMissedShots);

            var shotsButton = document.createElement('button');
            shotsButton.setAttribute('class', 'searchParameter');
            shotsButton.textContent = 'Print Shots';
            document.getElementById('gameInfo').appendChild(shotsButton);
            shotsButton.addEventListener('click', getShots);

          });

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
              const arraypenalties = [];

              for (i = 0; i < data.liveData.plays.penaltyPlays.length; i++) {
                penaltyPlay = data.liveData.plays.penaltyPlays[i];
                var penaltyData = document.createElement('p');

                penaltyData.innerHTML = ' Period: ' + data.liveData.plays.allPlays[penaltyPlay].about.period + ' Time: ' + data.liveData.plays.allPlays[penaltyPlay].about.periodTime + ', ' + data.liveData.plays.allPlays[penaltyPlay].result.penaltyMinutes + ' minutes, ' + 'Penalty Location: ' + data.liveData.plays.allPlays[penaltyPlay].coordinates.x + ' : ' + data.liveData.plays.allPlays[penaltyPlay].coordinates.y;
                document.getElementById('gameInfo').appendChild(penaltyData);
                var coordinates = { x: data.liveData.plays.allPlays[penaltyPlay].coordinates.x, y: data.liveData.plays.allPlays[penaltyPlay].coordinates.y };
                arraypenalties.push(coordinates);
                //    console.log(arraypenalties);

                for (j = 0; j < data.liveData.plays.allPlays[penaltyPlay].players.length; j++) {
                  //     console.log(data.liveData.plays);
                  var penaltyEvent2 = document.createElement('span');
                  penaltyEvent2.innerHTML = data.liveData.plays.allPlays[penaltyPlay].result.description;
                  document.getElementById('gameInfo').appendChild(penaltyEvent2);
                }
              }
              new Chart("penaltyChart", {
                type: "scatter",
                data: {
                  datasets: [{
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,0,255)",
                    data: arraypenalties
                  }]
                },
                options: {
                  legend: { display: false },
                  scales: {
                    xAxes: [{ ticks: { min: -100, max: 100 } }],
                    yAxes: [{ ticks: { min: -42.5, max: 42.5 } }],
                  }
                }
              });
            });
          //        console.log(arraypenalties);

        }
        function getRoster(event) {
          var genre = event.currentTarget.value;
          console.log('u r in get roster');

          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET", "headers": {
            }
          })

            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data.rosterSpots)

              var obj = data.rosterSpots;
              var keys = Object.keys(obj);

              var awayRoster = document.createElement('h2'); 
              awayRoster.innerHTML = data.awayTeam.abbrev + ' Roster ';
              awayRoster.setAttribute('id', 'awayTeamId');
              document.getElementById('gameInfoAway').appendChild(awayRoster);

              var homeRoster = document.createElement('h2');
              homeRoster.innerHTML = data.homeTeam.abbrev + ' Roster ';
              homeRoster.setAttribute('id', 'homeTeamId');
              document.getElementById('gameInfoHome').appendChild(homeRoster);
              const homeRosterArray = [];
              const awayRosterArray = [];
              console.log(idAwayTeam, idHomeTeam);

              for (var i = 0; i < keys.length; i++) {
                var val = obj[keys[i]];
                const playerName1 = val.firstName.default + ' ' + val.lastName.default;
                // const lastName = val.lastName.default;
                const primaryNumber1 = val.sweaterNumber;
                const tempAttribute = playerName1;
                var playerName = document.createElement('p');
                // console.log(val, val.lastName)
                playerName.innerHTML = val.sweaterNumber + ' ' + playerName1 + ' ' + ', ' + val.positionCode + ','
                playerName.setAttribute('id', tempAttribute);
                if (val.teamId === idAwayTeam) {
                  document.getElementById('awayTeamId').appendChild(playerName);
                  awayRosterArray.push(primaryNumber1, playerName1, val.playerId);
                  rosterArray = awayRosterArray;
                }
                else if (val.teamId === idHomeTeam) { document.getElementById('homeTeamId').appendChild(playerName);
                  homeRosterArray.push(primaryNumber1, playerName1, val.playerId);
                }
              }
              console.log(homeRosterArray, awayRosterArray);
            });
        }

        function getGoals(event) {
          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET", "headers": { }
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              var goalTitle = document.createElement('h3');
              goalTitle.setAttribute('id', 'drama');
              goalTitle.innerHTML = 'Goals - shot location figure will be added';
              document.getElementById('gameInfo').appendChild(goalTitle);
              const arrayGoals = [];

              for (i = 0; i < data.plays.length; i++) {
                if (data.plays[i].typeDescKey==='goal') {console.log(i, data.plays[i]);
                scoringPlay = data.plays[i];
                var newGoal = document.createElement('p');
                newGoal.innerHTML = 'Period: ' + data.plays[i].periodDescriptor.number + ' Time: ' + data.plays[i].timeInPeriod + ' Score: ' + data.plays[i].details.awayScore + ' : ' + data.plays[i].details.homeScore + ' Shot Location: ' + data.plays[i].details.xCoord + ' : ' + data.plays[i].details.yCoord;
                document.getElementById('gameInfo').appendChild(newGoal);
                var coordinates = { x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord };
                arrayGoals.push(coordinates);
                var goalEvent = document.createElement('span');

                for (j=0; j<data.rosterSpots.length; j++) {if (data.rosterSpots[j].playerId === data.plays[i].details.scoringPlayerId) {
                  console.log(data.rosterSpots[j].firstName.default, data.rosterSpots[j].lastName.default)
                  goalScorer = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                  var goal = document.createElement('span');
                  goal.innerHTML = 'GO,';
                  document.getElementById(goalScorer).appendChild(goal);
                }
              else if (data.rosterSpots[j].playerId === data.plays[i].details.assist1PlayerId) {
                assist1 = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                  var assist = document.createElement('span');
                  assist.innerHTML = 'AS1,';
                //     const assistant = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                  document.getElementById(assist1).appendChild(assist);
              }
              else if (data.rosterSpots[j].playerId === data.plays[i].details.assist2PlayerId) {
                assist2 = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                var assist = document.createElement('span');
                assist.innerHTML = 'AS2,';
              //     const assistant = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                document.getElementById(assist2).appendChild(assist);
              }
              }
    
                console.log(data.plays[i].details, data.plays[i].details.scoringPlayerId, homeRosterArray.indexOf(data.plays[i].details.scoringPlayerId))
                goalEvent.innerHTML = 'Goal: ' + goalScorer + ' Assist(s): ' + assist1 + ', ' + assist2;
                document.getElementById('gameInfo').appendChild(goalEvent);
                }
              
                //   else if (data.liveData.plays.allPlays[scoringPlay].players[j].playerType == 'Goalie') {
                //     var goal = document.createElement('span');
                //     goal.innerHTML = 'AL,';
                //     const Goalie = data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName;
                //     document.getElementById(Goalie).appendChild(goal);
                //   }
                // }
              }
              console.log(arrayGoals);
             
              new Chart("myChart", {
                type: "scatter",
                data: {
                  datasets: [{
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,0,255)",
                    data: arrayGoals
                  }]
                },
                options: {
                  legend: { display: false },
                  scales: {
                    xAxes: [{ ticks: { min: -100, max: 100 } }],
                    yAxes: [{ ticks: { min: -42.5, max: 42.5 } }],
                  }
                }
              });

            });
        };

        function getFaceoffs(event) {
          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET"
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data.rosterSpots);
              for (i = 0; i < data.plays.length; i++) {if (data.plays[i].typeDescKey==='faceoff') {
                // console.log(i, data.plays[i]);
               for (j=0; j<data.rosterSpots.length; j++) { if (data.rosterSpots[j].playerId === data.plays[i].details.winningPlayerId) {// console.log('winning', data.rosterSpots[j])
              faceOffWinner = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
              var faceOffWin = document.createElement('span');
              faceOffWin.innerHTML = 'FW,';
              document.getElementById(faceOffWinner).appendChild(faceOffWin)}
              else if (data.rosterSpots[j].playerId === data.plays[i].details.losingPlayerId) { //console.log('losing', data.rosterSpots[j]); 
              faceOffLoser = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
              var faceOffLoss = document.createElement('span');
              faceOffLoss.innerHTML = 'FL,';
              document.getElementById(faceOffWinner).appendChild(faceOffLoss)
            }}

              }}
            });
        }

        function getShots(event) {
          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET"
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              const arrayShotsHome = [];
              const arrayShotsRoad = [];
            //  const arrayShots = [];

              for (i = 0; i < data.plays.length; i++) {
                if (data.plays[i].typeDescKey === 'shot-on-goal') {
                 console.log(data.plays[i]);
                 for (j=0; j<data.rosterSpots.length; j++) {if (data.rosterSpots[j].playerId === data.plays[i].details.shootingPlayerId) {
              shooter = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
              var shot = document.createElement('span');
              shot.innerHTML = 'SH,';
              document.getElementById(shooter).appendChild(shot);
              if (data.rosterSpots[j].teamId === data.awayTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                arrayShotsRoad.push(arrayShotsObject)
              }
              else if (data.rosterSpots[j].teamId === data.homeTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                arrayShotsHome.push(arrayShotsObject)}
                 }
                else if (data.rosterSpots[j].playerId === data.plays[i].details.goalieInNetId) {
                  savior = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
              var save = document.createElement('span');
              save.innerHTML = 'SV,';
              document.getElementById(savior).appendChild(save)
                }}}}
              // console.log(arrayShots);
              new Chart("shotsChart", {
                type: "scatter",
                data: {
                  datasets: [{pointRadius: 4,
                    pointBackgroundColor: "rgb(0,0,255)",
                    data: arrayShotsHome},
                  {
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,255,0)",
                    data: arrayShotsRoad}]
                },
                options: {
                  legend: { display: true,
                  text: 'Road team' },                
                    title: {
                        display: true,
                        text: 'Shots on goals'                  
                },
                  scales: {
                    xAxes: [{ ticks: { min: -100, max: 100 } }],
                    yAxes: [{ ticks: { min: -42.5, max: 42.5 } }],
                  }
                }
              });
             console.log(arrayShotsHome);
             console.log(arrayShotsRoad);
            });
        }

        function getBlockedShots(event) {
          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET"
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              const arrayBlockedShotsHome = [];
              const arrayBlockedShotsRoad = [];
              for (i = 0; i < data.plays.length; i++) {
                if (data.plays[i].typeDescKey==='blocked-shot') {
                  for (j=0; j<data.rosterSpots.length; j++) { if (data.rosterSpots[j].playerId === data.plays[i].details.shootingPlayerId) {
                    shooter = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                    var blockedShot = document.createElement('span');
                    blockedShot.innerHTML = 'BS,';
                    document.getElementById(shooter).appendChild(blockedShot);                    
                    if (data.rosterSpots[j].teamId === data.awayTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                    arrayBlockedShotsRoad.push(arrayShotsObject)
                  }
                  else if (data.rosterSpots[j].teamId === data.homeTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                  arrayBlockedShotsHome.push(arrayShotsObject)}
                  }
                else if (data.rosterSpots[j].playerId === data.plays[i].details.blockingPlayerId) {
                  blocker = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                  var shotBlocked = document.createElement('span');
                  shotBlocked.innerHTML = 'SB,';
                  document.getElementById(blocker).appendChild(shotBlocked);
                }}}
              }
              new Chart("blockedShotsChart", {
                type: "scatter",
                data: {
                  datasets: [{
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,0,255)",
                    data: arrayBlockedShotsHome                    
                  },
                  {
                    pointRadius: 4,
                    pointBackgroundColor: "rgb(0,255,0)",
                    data: arrayBlockedShotsRoad               
                  }
                ]
                },
                options: {
                  legend: { display: true,
                  text: 'trial text'},                
                    title: {
                        display: true,
                        text: 'Blocked Shots on goals'                  
                },
                  scales: {
                    xAxes: [{ ticks: { min: -100, max: 100 } }],
                    yAxes: [{ ticks: { min: -42.5, max: 42.5 } }],
                  }
                }
              });
              console.log(arrayBlockedShotsHome);
              console.log(arrayBlockedShotsRoad);
            });

          const currentPlayer = document.getElementById(rosterArray[29]);

          // var playerData = {BShot: count1, SBlock: count2}; // Uncaught (in promise) TypeError: Assignment to constant variable. at script.js:395:17
          //    string0 = JSON.stringify(currentPlayer)
          //   const array1 = string0.split("</span>");

          // console.log(currentPlayer.textContent);

          // currentPlayerArray = currentPlayer.textContent.split(',');
          // console.log(currentPlayerArray);
          // count1 = 0;
          // count2 = 0;
          // count3 = 0;
          // count4 = 0;
          // count5 = 0;
          // count6 = 0;
          // count7 = 0;
          // for (i = 0; i < currentPlayerArray.length; i++) {

          //   if (currentPlayerArray[i] == 'FW')
          //     count1++;
          //   else if (currentPlayerArray[i] == 'FL')
          //     count2++;
          //   else if (currentPlayerArray[i] == 'GO')
          //     count3++;
          //   else if (currentPlayerArray[i] == 'AS')
          //     count4++;
          //   else if (currentPlayerArray[i] == 'SB')
          //     count5++;
          //   else if (currentPlayerArray[i] == 'BL')
          //     count6++;
          //   else if (currentPlayerArray[i] == 'MO')
          //     count7++;
          //   else if (currentPlayerArray[i] == 'MW')
          //     count7++;
          // }
          // console.log(count1, count2, count3, count4, count5, count6, count7);

          // const array2 = 
          //  console.log(array1);

        }
        function getMissedShots(event) {
          var requestURL = 'https://cors-anywhere.herokuapp.com/api-web.nhle.com/v1/gamecenter/' + gameId + '/play-by-play';
          fetch(requestURL, {
            "method": "GET"
          })
            .then(function (response) {return response.json()
            })
            .then(function (data) {
              const arrayMissedShotsHome = [];
              const arrayMissedShotsRoad = [];
              for (i = 0; i < data.plays.length; i++) {
                for (j=0; j<data.rosterSpots.length; j++) { 
                if (data.plays[i].typeDescKey === 'missed-shot') {if (data.rosterSpots[j].playerId === data.plays[i].details.shootingPlayerId) {
                  shooter = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;
                  if (data.plays[i].details.reason.includes('wide')) {                      
                    var missedWide = document.createElement('span');
                    missedWide.innerHTML = 'MW,';
                    document.getElementById(shooter).appendChild(missedWide);                  
                  }
                  else if (data.plays[i].details.reason.includes('above')) {                      
                    var missedOver = document.createElement('span');
                    missedOver.innerHTML = 'MO,';
                    document.getElementById(shooter).appendChild(missedOver);                  
                  }
                  if (data.rosterSpots[j].teamId === data.awayTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                  arrayMissedShotsRoad.push(arrayShotsObject)
                }
                else if (data.rosterSpots[j].teamId === data.homeTeam.id) {arrayShotsObject = {x: data.plays[i].details.xCoord, y: data.plays[i].details.yCoord}
                  arrayMissedShotsHome.push(arrayShotsObject)}
                  }
                }
              }
              }
              console.log(arrayMissedShotsHome);
              console.log(arrayMissedShotsRoad);
            });

        }
      }
    }
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