then(function (data) {
    const arrayBlockedShotsHome = [];
    const arrayBlockedShotsRoad = [];
    for (i = 0; i < data.liveData.plays.allPlays.length; i++) {
      if (data.liveData.plays.allPlays[i].result.event == 'Blocked Shot') {
        const descript = data.liveData.plays.allPlays[i].result.description;
        descriptArray = descript.split(' shot');
        descriptArray2 = descriptArray[2].split('by ');
        fullNameShooter = descriptArray[0];
        fullNameBlocker = descriptArray2[1];
        var foWin = document.createElement('span');
        var foLoss = document.createElement('span');
        foWin.innerHTML = 'BL,'; // + data.liveData.plays.allPlays[i].coordinates.x + ':' + data.liveData.plays.allPlays[i].coordinates.y + ','
        foLoss.innerHTML = 'SB,';//<p id="Robby Fabbri">14 Robby Fabbri, C shoots or catches:L,</p>
        var check1 = document.getElementById(fullNameBlocker);
        var check2 = document.getElementById(fullNameShooter);
        if (check1 == null || check2 == null)
        {console.log('error in blocked')}
        else {
        document.getElementById(fullNameBlocker).appendChild(foWin); //Gustav Forsling shot blocked shot by Robby Fabbri
        document.getElementById(fullNameShooter).appendChild(foLoss); //    Pius Suter shot blocked shot by Radko Gudas Robby Fabbri Robby Fabbri
        console.log(foLoss.textContent, fullNameShooter);
        }
        var coordinates = { x: data.liveData.plays.allPlays[i].coordinates.x, y: data.liveData.plays.allPlays[i].coordinates.y };
      //  arrayBlockedShots.push(coordinates);
        if (document.getElementById('gameInfoAway').textContent.includes(fullNameShooter))
        {arrayBlockedShotsRoad.push(coordinates)}                  
         else if (document.getElementById('gameInfoHome').textContent.includes(fullNameShooter))
         {arrayBlockedShotsHome.push(coordinates)} 
         else console.log('error in missed');
      }
    }

    console.log(arrayBlockedShotsHome);
    console.log(arrayBlockedShotsRoad);
  });