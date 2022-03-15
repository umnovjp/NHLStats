then(function (data) {
    const arrayMissedShotsHome = [];
    const arrayMissedShotsRoad = [];
    for (i = 0; i < data.liveData.plays.allPlays.length; i++) {
      if (data.liveData.plays.allPlays[i].result.event == 'Missed Shot') {       
        const descript = data.liveData.plays.allPlays[i].result.description;
        if (descript.includes(' Wide of Net')) {
          descriptArray = descript.split(' Wide of Net');
          fullNameMissed = descriptArray[0];
          var foWin = document.createElement('span');
          foWin.innerHTML = 'MW,' + data.liveData.plays.allPlays[i].coordinates.x + ':' + data.liveData.plays.allPlays[i].coordinates.y +',';
          document.getElementById(fullNameMissed).appendChild(foWin);
        }
        else if (descript.includes(' Over Net')) {
          descriptArray = descript.split(' Over Net');
          console.log(descriptArray);
          fullNameMissed = descriptArray[0];
          var foWin = document.createElement('span');
          foWin.innerHTML = 'MO,' + data.liveData.plays.allPlays[i].coordinates.x + ':' + data.liveData.plays.allPlays[i].coordinates.y +',';
        }  
        var check1 = document.getElementById(fullNameMissed);
       // var check2 = document.getElementById(fullNameShooter);
        if (check1 == null)
        {console.log('error in missed')}
        else {
          document.getElementById(fullNameMissed).appendChild(foWin);
        }
        var coordinates = { x: data.liveData.plays.allPlays[i].coordinates.x, y: data.liveData.plays.allPlays[i].coordinates.y };
        if (document.getElementById('gameInfoAway').textContent.includes(fullNameMissed))
        {arrayMissedShotsRoad.push(coordinates);

        }                  
         else if (document.getElementById('gameInfoHome').textContent.includes(fullNameMissed))
         {arrayMissedShotsHome.push(coordinates)} 
         else console.log('error in missed');
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
      }
    }
    console.log(arrayMissedShotsHome);
    console.log(arrayMissedShotsRoad);
  });