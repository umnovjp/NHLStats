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


if (data.plays[i].details.reason.includes('wide')) {
  shooter = data.rosterSpots[j].firstName.default + ' ' + data.rosterSpots[j].lastName.default;  
  var foWin = document.createElement('span');
  foWin.innerHTML = 'MW,' + data.liveData.plays.allPlays[i].coordinates.x + ':' + data.liveData.plays.allPlays[i].coordinates.y +',';
  console.log(fullNameMissed, foWin.innerHTML);
  const check = document.getElementById(fullNameMissed);
  if (check == null)
  {console.log('error in missed', fullNameMissed)}
  else {
  document.getElementById(fullNameMissed).appendChild(foWin);
  }
}
else if (descript.includes(' Over Net')) {
  descriptArray = descript.split(' Over Net');
  console.log(descriptArray);
  fullNameMissed = descriptArray[0];
  var foWin = document.createElement('span');
  foWin.innerHTML = 'MO,' + data.liveData.plays.allPlays[i].coordinates.x + ':' + data.liveData.plays.allPlays[i].coordinates.y +',';
}
  var check1 = document.getElementById(fullNameMissed);
//    var check2 = document.getElementById(fullNameShooter);
if (check1 == null)
{console.log('error in missed', fullNameMissed)}
else {
  document.getElementById(fullNameMissed).appendChild(foWin);
}
var coordinates = { x: data.liveData.plays.allPlays[i].coordinates.x, y: data.liveData.plays.allPlays[i].coordinates.y };
if (document.getElementById('gameInfoAway').textContent.includes(fullNameMissed))
{arrayMissedShotsRoad.push(coordinates);

}                  
 else if (document.getElementById('gameInfoHome').textContent.includes(fullNameMissed))
 {arrayMissedShotsHome.push(coordinates)} 
 else console.log('error in missed', fullNameMissed);
//  var coord = document.createElement('span');
//  coord2 = JSON. stringify(coordinates);
//  coord.innerHTML = coord2;
//  document.getElementById(fullNameMissed).appendChild(coord);
 new Chart("missedShotsChart", {
  type: "scatter",
  data: {
    datasets: [{
      pointRadius: 4,
      pointBackgroundColor: "rgb(0,0,255)",
      data: arrayMissedShotsHome                    
    },
    {
      pointRadius: 4,
      pointBackgroundColor: "rgb(0,255,0)",
      data: arrayMissedShotsRoad               
    }
  ]
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