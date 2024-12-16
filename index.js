const express = require("express");
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 8888;

app.use(express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());

const supabaseURL = "https://bxpqeyuxtzcczjktprwe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cHFleXV4dHpjY3pqa3RwcndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTQ5MjAsImV4cCI6MjA0OTQzMDkyMH0.t1c8Lyhv3lJgTcrc5rPeLZymPjZ8kG-VrHBVMd9ssM8";
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

//loads homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

//callback
app.get("/blendhome.html", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blendhome.html"));
});

//load about page
app.get("/public/blendabout.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blendabout.html"));
});

//load help page
app.get("/public/blendhelp.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "blendhelp.html"));
});

//add user top artists to supabase, link to user id
app.post("/usertopartists", async (req, res) => {
  console.log("request ", req.body);
  const userID = req.body.user_id;
  const artistName = req.body.artist_name;
  const artistID = req.body.artist_id;
  const genreNames = req.body.genre_name;

  const { data, error } = await supabase.from("top_artists").insert({
    user_id: userID,
    artist_name: artistName,
    artist_id: artistID,
    genre_name: genreNames,
  });

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data retrieved");
    res.send(data);
  }
});

//gets data from the table
app.get("/usertopartists", async (req, res) => {
  console.log("Top artists");
  //use the .select to get the items from the table
  //.eq is used to look for the specific user id
  //not sure if the userID variable will work?
  //the userID should be of the person that signed in
  //so the intended use would be when the person logs in the code will look for that userID in the table and return the top artists
  //.limit is used to make sure that only 10 top artists are returned
  const { data, error } = await supabase.from("top_artists").select();
  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data Retrieced");
    res.send(data);
  }
});

console.log("Listening on ", port);
app.listen(port);
