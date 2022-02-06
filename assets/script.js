var listOfMoviesOMDB = document.getElementById('boxOfDVDsOmdb');
var fetchOmdbButton = document.getElementById('searchOmdbButton');
var listOfMoviesImdbDrama = document.getElementById('boxOfDVDsDrama');
var fetchPenalties = document.getElementById('dramaImdbButton');
var listOfMoviesImdbFamily = document.getElementById('boxOfDVDsFamily');
var fetchImdbFamily = document.getElementById('familyImdbButton');
var listOfMoviesImdbThriller = document.getElementById('boxOfDVDsThriller');
var fetchImdbThriller = document.getElementById('thrillerImdbButton');
var listOfMoviesImdbComedy = document.getElementById('boxOfDVDsComedy');
var fetchImdbComedy = document.getElementById('comedyImdbButton');
var listOfMoviesImdbAction = document.getElementById('boxOfDVDsAction');
var fetchImdbAction = document.getElementById('actionImdbButton');
// var enterYear0 = document.getElementById('enterYear');
var movieTitle;
var object1;
var inputVal = '2021';
var inputYear = 2021;
//these five variables are created to display movies 5-9, 10-14, etc. They do not work yet
var dramaCount = 0;
var familyCount = 0;
var thrillerCount = 0;
var comedyCount = 0;
var actionCount = 0;

// two lines below will allow user to search by year
function getInputValue() {var inputVal = document.getElementById('myInput').value;
console.log('inputVal'+inputVal);
console.log(typeof inputVal);
inputYear = parseInt(inputVal);
console.log('inputYear'+inputYear);
}

localStorage.setItem('inputYear', inputVal);
console.log('outside finction ' + inputYear);
fetchPenalties.addEventListener('click', getPenalties);
fetchImdbFamily.addEventListener('click', getGoals);
fetchImdbThriller.addEventListener('click', getPenalties);
fetchImdbComedy.addEventListener('click', getPenalties);
fetchImdbAction.addEventListener('click', getPenalties);

function getPenalties(event) {
  var genre = event.currentTarget.value;
  console.log(genre);
  // three lines below are supposed to add year to the header but they do it multiple times if I click multiple buttons. disabled for now
//   var movieYear = document.createElement('span');
// movieYear.innerHTML = inputYear;
// document.getElementById('top5D').appendChild(movieYear);

  var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/2021020722/feed/live';
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
      
      console.log(data.gameData.teams.away.name);
      console.log(data.gameData.teams.home.name);

      var awayTeam = document.createElement('p');
      awayTeam.innerHTML = data.gameData.teams.away.name + ' vs ' + data.gameData.teams.home.name;
      document.getElementById('input2').appendChild(awayTeam);

      console.log(data.gameData.players);
      console.log(data.liveData.decisions);
      console.log(data.liveData.linescore);
      
      console.log(data.liveData.plays.allPlays.length);
      console.log(data.liveData.plays.penaltyPlays.length);
      console.log(data.liveData.plays.scoringPlays.length);

      for (i = 0; i < data.liveData.plays.penaltyPlays.length; i++) {
        penaltyPlay = data.liveData.plays.penaltyPlays[i];
       // console.log(data.liveData.plays.penaltyPlays[i]);
       console.log(data.liveData.plays.allPlays[penaltyPlay].about);
       console.log(data.liveData.plays.allPlays[penaltyPlay].coordinates);
       console.log(data.liveData.plays.allPlays[penaltyPlay].players);
       console.log(data.liveData.plays.allPlays[penaltyPlay].result);
       console.log(data.liveData.plays.allPlays[penaltyPlay].team);

     //  for (j = 0; j < data.liveData.plays.allPlays[scoringPlay].players.length; j++)

       for (j = 0; j < data.liveData.plays.allPlays[penaltyPlay].players.length; j++){
         console.log('in j loop');
       var penaltyEvent = document.createElement('p');
          penaltyEvent.innerHTML = data.liveData.plays.allPlays[penaltyPlay].players[j].playerType + ' ' + data.liveData.plays.allPlays[penaltyPlay].players[j].player.fullName + ' Period: ' + data.liveData.plays.allPlays[penaltyPlay].about.period + ' Time: ' + data.liveData.plays.allPlays[penaltyPlay].about.periodTime;
          document.getElementById('boxOfDVDsDrama').appendChild(penaltyEvent);
          // var penaltyData = document.createElement('p');
          // penaltyData.innerHTML = ;
          // document.getElementById('boxOfDVDsDrama').appendChild(penaltyData);
            
        }
       }

 //      for all plays, uncomment lines 96,97, 170
      // for (i = 0; i < data.liveData.plays.allPlays.length; i++) {
      //   console.log(data.liveData.plays.allPlays[i]);

      //   var movieName = document.createElement('p');
      //   movieName.textContent = data.results[i].title;
      //   movieTitle = data.results[i].title;
      //   // ugly method to replace ' ' to %20 in movieTitle, I know I was supposed to write a loop
      //   movieTitleFormatted = movieTitle.replace(" ", "%20");
      //   movieTitleFormatted1 = movieTitleFormatted.replace(" ", "%20");
      //   movieTitleFormatted2 = movieTitleFormatted1.replace(" ", "%20");
      //   movieTitleFormatted3 = movieTitleFormatted2.replace(" ", "%20");
      //   movieTitleFormatted4 = movieTitleFormatted3.replace(" ", "%20");
      //   var requestURLOmdb = 'https://www.omdbapi.com/?i=tt3896198&apikey=bf124b81&t=' + movieTitleFormatted4 + '&plot=full'
      //   var requestPosterOmdb = 'http://img.omdbapi.com/?i=tt3896198&apikey=bf124b81&t=' + movieTitleFormatted4 + '&plot=full'
      //   // end of ugly method


      //   //start second fetch
      //   fetch(requestURLOmdb)
      //     .then(function (response) {
      //       return response.json();
      //     })
      //     .then(function (data) {
      //       var object1 = data;
      //       // I definitely can convert following five if .. else if ... else if ... pieces to one loop later
      //       if (genre == 'Drama') {

      //         var movieName1 = document.createElement('p');
      //         movieName1.innerHTML = object1.Title;
      //         document.getElementById('boxOfDVDsDrama').appendChild(movieName1);
      //         var movieData = document.createElement('p');
      //         movieData.innerHTML = 'Director: ' + object1.Director + ', Actors: ' + object1.Actors + ', Rating ' + object1.Metascore + ', Plot: ' + object1.Plot;
      //         document.getElementById('boxOfDVDsDrama').appendChild(movieData)
      //         dramaCount++;
      //       }
      //       else if (genre == 'Family') {
      //         var movieName1 = document.createElement('p');
      //         movieName1.innerHTML = object1.Title;
      //         document.getElementById('boxOfDVDsFamily').appendChild(movieName1)
      //         var movieData = document.createElement('p');
      //         movieData.innerHTML = 'Director: ' + object1.Director + ', Actors: ' + object1.Actors + ', Rating ' + object1.Metascore + ', Plot: ' + object1.Plot;
      //         document.getElementById('boxOfDVDsFamily').appendChild(movieData)
      //         familyCount++;
      //       }
      //       else if (genre == 'Thriller') {
      //         var movieName1 = document.createElement('p');
      //         movieName1.innerHTML = object1.Title;
      //         document.getElementById('boxOfDVDsThriller').appendChild(movieName1)
      //         var movieData = document.createElement('p');
      //         movieData.innerHTML = 'Director: ' + object1.Director + ', Actors: ' + object1.Actors + ', Rating ' + object1.Metascore + ', Plot: ' + object1.Plot;
      //         document.getElementById('boxOfDVDsThriller').appendChild(movieData)
      //         thrillerCount++;
      //       }
      //       else if (genre == 'Comedy') {
      //         var movieName1 = document.createElement('p');
      //         movieName1.innerHTML = object1.Title;
      //         document.getElementById('boxOfDVDsComedy').appendChild(movieName1)
      //         var movieData = document.createElement('p');
      //         movieData.innerHTML = 'Director: ' + object1.Director + ', Actors: ' + object1.Actors + ', Rating ' + object1.Metascore + ', Plot: ' + object1.Plot;
      //         document.getElementById('boxOfDVDsComedy').appendChild(movieData)
      //         comedyCount++;
      //       }
      //       else if (genre == 'Action') {
      //         var movieName1 = document.createElement('p');
      //         movieName1.innerHTML = object1.Title;
      //         document.getElementById('boxOfDVDsAction').appendChild(movieName1)
      //         var movieData = document.createElement('p');
      //         movieData.innerHTML = 'Director: ' + object1.Director + ', Actors: ' + object1.Actors + ', Rating ' + object1.Metascore + ', Plot: ' + object1.Plot;
      //         document.getElementById('boxOfDVDsAction').appendChild(movieData)
      //         thrillerCount++;
      //       }
      //       else { }
      //     });
      //   //end second fetch
      // }
    });
}

function getGoals(event) {
  var genre = event.currentTarget.value;
  console.log(genre);
  // three lines below are supposed to add year to the header but they do it multiple times if I click multiple buttons. disabled for now
//   var movieYear = document.createElement('span');
// movieYear.innerHTML = inputYear;
// document.getElementById('top5D').appendChild(movieYear);

  var requestURL = 'https://statsapi.web.nhl.com/api/v1/game/2021020722/feed/live';
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
      
      console.log(data.gameData.teams.away.name);
      console.log(data.gameData.teams.home.name);

       for (i = 0; i < data.liveData.plays.scoringPlays.length; i++) {
        scoringPlay = data.liveData.plays.scoringPlays[i];
     //   console.log(data.liveData.plays.allPlays[scoringPlay].players);

     var newGoal = document.createElement('p');
     newGoal.innerHTML = 'Score: ' + data.liveData.plays.allPlays[scoringPlay].about.period + ' Time: ' + data.liveData.plays.allPlays[scoringPlay].about.periodTime;
     document.getElementById('boxOfDVDsFamily').appendChild(newGoal);

     
        // console.log(data.liveData.plays.penaltyPlays[i]);
        for (j = 0; j < data.liveData.plays.allPlays[scoringPlay].players.length; j++)
        {
    //      console.log(data.liveData.plays.allPlays[scoringPlay].players[j].playerType);
     //     console.log(data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName);
          var goalEvent = document.createElement('p');
          goalEvent.innerHTML = 'Name: ' + data.liveData.plays.allPlays[scoringPlay].players[j].player.fullName + ' Type: ' + data.liveData.plays.allPlays[scoringPlay].players[j].playerType;
          document.getElementById('boxOfDVDsFamily').appendChild(goalEvent);
          // var goalData = document.createElement('p');
          // goalData.innerHTML = ;
          // document.getElementById('boxOfDVDsFamily').appendChild(goalData)

        }
        console.log(data.liveData.plays.allPlays[scoringPlay].result);
        console.log(data.liveData.plays.allPlays[scoringPlay].about);
        console.log(data.liveData.plays.allPlays[scoringPlay].coordinates);
        console.log(data.liveData.plays.allPlays[scoringPlay].team);
       }
    });
}

