const express = require("express");
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const supabaseURL = "https://bxpqeyuxtzcczjktprwe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4cHFleXV4dHpjY3pqa3RwcndlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NTQ5MjAsImV4cCI6MjA0OTQzMDkyMH0.t1c8Lyhv3lJgTcrc5rPeLZymPjZ8kG-VrHBVMd9ssM8";
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

app.get("/TESTs", async (req, res) => {
  console.log("test attempt");

  const { data, error } = await supabase.from("TEST").select();

  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data retrieved");
    res.send(data);
  }
});

app.post("/TEST", async (req, res) => {
  console.log("add username");

  console.log("request", req.body);

  const username = req.body.username;
  const { data, error } = await supabase
    .from("TEST")
    .insert({ username: username })
    .select();
  if (error) {
    console.log("Error: ", error);
    res.send(error);
  } else {
    console.log("Data retrieved");
    res.send(data);
  }
});

app.listen(port, () => {
  console.log("App is here");
});
