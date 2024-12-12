var client_id = "4a99b5944530470daf7c9659a88fc2f0";
var client_secret = "a3a8ddad071242128d8d0c39c332fe88";
var redirect_uri = "http://localhost:8888/public/blendhome.html";

const authorize = "https://accounts.spotify.com/authorize";

const token = "https://accounts.spotify.com/api/token";
const currentUser = "https://api.spotify.com/v1/me";

//initialize slider
simpleslider.getSlider({
  container: document.getElementById("BTSSlider"),
});

function selectGenre(chosenGenre) {
  const button = document.getElementById("genreButton");
  button.textContent = chosenGenre;

  const genreColors = {
    Pop: "#f1c5ae",
    Rock: "#ecddd0",
    Rap: "#ced2c2",
    "R&B": "#92b1b6",
    EDM: "#35455d",
    Country: "#bfd1df",
    Jazz: "#e8d0a9",
    Classical: "#c1dad6",
    Indie: "#6d929",
  };

  button.style.backgroundColor = genreColors[chosenGenre] || "#898989";
}

//authorization
function spotifyAuth() {
  let url = authorize;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  //url += "&scope="
  window.location.href = url;
}

function onPageLoad() {
  //if its users first time on page
  if (window.location.search.length > 0) {
    redirectUser();
  } else {
    getUser();
  }
}

function redirectUser() {
  let code = getCode();
  fetchAccessToken(code);
  window.history.pushState("", "", redirect);
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
    "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64")
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
    if (data.access_token != undefined) {
      access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
    }
    if (data.refresh_token != undefined) {
      refresh_token = data.refresh_token;
      localStorage.setitem("refresh_token", refresh_token);
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

async function getUser() {
  const user = await fetch(currentUser);
  if (!user) {
    console.log("error");
  } else {
    console.log("success");
  }
}
// async function getUserID() {
//   //test with only one user ID, need to scale
//   const userID = document.getElementById("User1");

//   //eval userID with regex, ensure correct format & give user the incorrect userID
//   try {
//     const response = await fetch(`https://api.spotify.com/v1/users/${userID}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const validID = await response.json();
//     console.log(validID);
//   } catch (error) {
//     console.error("Error fetching user profile: ", error);
//   }
// }