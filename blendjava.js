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

function getUserID() {
  //test with only one user ID, need to scale
  const userID = document.getElementById("User1");

  //eval userID with regex, ensure correct format & give user the incorrect userID
  try {
    const validID = fetch(`https://api.spotify.com/v1/users/${userID}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      },
      console.log(validID)
    );
  } catch (error) {
    console.error("Error fetching user profile: ", error);
  }
}
