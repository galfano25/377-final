//OAuth stuff
var client_id = "4a99b5944530470daf7c9659a88fc2f0";
var client_secret = "a3a8ddad071242128d8d0c39c332fe88";
var redirect_uri = "http://localhost:8888/public/blendhome.html";

const authorize = "https://accounts.spotify.com/authorize";

const token = "https://accounts.spotify.com/api/token";
const userID = "https://api.spotify.com/v1/me";
let username = null;
let artistData = null;
//change the limit to change the amount of artists returned
let genreChoice = null;
let top10Artists = null;
let genresForList = null;
const artists = "https://api.spotify.com/v1/me/top/artists?limit=10";

const genreColors = {
  0: "#f1c5ae",
  1: "#ecddd0",
  2: "#ced2c2",
  3: "#92b1b6",
  4: "#35455d",
  5: "#bfd1df",
  6: "#e8d0a9",
  7: "#c1dad6",
  8: "#6d929",
};

//initialize slider
simpleslider.getSlider({
  container: document.getElementById("BTSSlider"),
});

function selectGenre(chosenGenre) {
  genreChoice = chosenGenre;
  const button = document.getElementById("genreButton");
  button.textContent = genresForList[chosenGenre];
  button.style.backgroundColor = genreColors[chosenGenre] || "#898989";
  button.style.color = "white";
}

function updateGenres(array) {
  array.forEach((genre, index) => {
    const link = document.getElementById(index.toString());
    if (link) {
      link.textContent = genre;
      link.onclick = () => selectGenre(index);
    }
  });
}

//authorization
function spotifyAuth() {
  let url = authorize;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url += "&scope=user-top-read user-read-private user-read-email"; //OAuth scope, changes permissions
  window.location.href = url;
}

function onPageLoad() {
  if (window.location.search.length > 0) {
    redirectUser();
  } else {
    getUserData();
  }
}

function topArtists() {
  if (artistData && artistData.length > 0) {
    artistData.forEach((artist) => {
      fetch("http://localhost:8888/usertopartists", {
        method: "POST",
        body: JSON.stringify({
          user_id: username,
          artist_name: artist.name,
          artist_id: artist.id,
          genre_name: artist.genres,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
    });
    console.log(artistData[0].images.map((image) => image.url));
  } else {
    console.error("Data is unavailable");
  }
}

function redirectUser() {
  let code = getCode();
  if (code) {
    fetchAccessToken(code);
    window.history.pushState("", "", redirect_uri);
    getUserData();
  } else {
    console.error("Authorization code not found");
  }
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
}

function fetchAccessToken(code) {
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(redirect_uri);
  body += "&client_id=" + client_id;
  body += "&client_secret=" + client_secret;
  callAuthApi(body);
}

function callAuthApi(body) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", token, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader(
    "Authorization",
    "Basic " + btoa(client_id + ":" + client_secret)
  );
  xhr.send(body);
  xhr.onload = handleAuthResponse;
}

function refreshAccessToken() {
  refresh_token = localStorage.getItem("refresh_token");
  let body = "grant_type=refresh_token";
  body += "&refresh_token=" + refresh_token;
  body += "&client_id=" + client_id;
  callAuthApi(body);
}

function handleAuthResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    //getUserID();
    if (data.access_token != undefined) {
      access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
    }
    if (data.refresh_token != undefined) {
      refresh_token = data.refresh_token;
      localStorage.setItem("refresh_token", refresh_token);
    }
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function callApi(method, url, body, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "aplication/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("access_token")
  );
  xhr.send(body);
  xhr.onload = callback;
}

//grabs top artists and username upon load
function getUserData() {
  //get artists
  callApi("GET", artists, null, handleArtistResponse);

  //get username
  callApi("GET", userID, null, handleUserIDResponse);
}

function handleArtistResponse() {
  if (this.status == 200) {
    //top artist data is here
    var data = JSON.parse(this.responseText);
    artistData = data.items;
    console.log(artistData);
    topArtists();
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

function handleUserIDResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    username = data.id;
    console.log(username);
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}

// Function to get the top artists of the currently logged-in user
function getTopArtists() {
  if (!username) {
    // Ensure username (userID) is available
    console.error("No logged-in user found. Unable to fetch top artists.");
    return;
  }

  const endpoint = `http://localhost:8888/usertopartists`;

  fetch(endpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        // Filter artists by user_id
        const userTopArtists = data.filter(
          (artist) => artist.user_id === username
        );

        // Remove duplicates based on artist_id
        const uniqueArtists = [];
        const artistIds = new Set();
        userTopArtists.forEach((artist) => {
          if (!artistIds.has(artist.artist_id)) {
            // Check if artist_id is not in the Set
            artistIds.add(artist.artist_id); // Add artist_id to Set
            uniqueArtists.push(artist); // Add artist to the unique list
          }
        });

        // Limit the data to the top 10 unique artists
        top10Artists = uniqueArtists.slice(0, 10);

        //selects the genres
        const favGenres = [];

        top10Artists.forEach((artist) => {
          artist.genre_name.forEach((genre) => {
            favGenres.push(genre);
          });
        });

        //randomly selects 10 genres
        genresForList = getRandomGenres(favGenres);
        updateGenres(genresForList);

        document.getElementById("getRecommendations").style.display = "block";

        // Log top 10 artists
        console.log(
          "Top 10 unique artists for user",
          username,
          ":",
          "Artists:",
          top10Artists
        );
      } else {
        console.error("Unexpected data format. Expected an array.");
      }
    })
    .catch((error) => {
      console.error("Error fetching top artists:", error.message);
    });
}

function getRandomGenres(array) {
  const result = [];
  const indices = new Set();

  while (result.length < 10 && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!indices.has(randomIndex)) {
      result.push(array[randomIndex]);
      indices.add(randomIndex);
    }
  }
  console.log("random genres from fav artists: ", result);
  return result;
}

function callArtistRecs() {
  console.log(genreChoice);
  const search = `https://api.spotify.com/v1/search?q=genre%3A${genreChoice}&type=track&limit=10`;
  callApi("GET", search, null, handleSearchResponse);
}

function handleSearchResponse() {
  if (this.status == 200) {
    var data = JSON.parse(this.responseText);
    console.log(data.tracks.items);
  } else if (this.status == 401) {
    refreshAccessToken();
  } else {
    console.log(this.responseText);
    alert(this.responseText);
  }
}
