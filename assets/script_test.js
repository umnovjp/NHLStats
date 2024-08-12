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