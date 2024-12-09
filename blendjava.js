simpleslider.getSlider({
  container: document.getElementById("BTSSlider"),
});

function selectGenre(chosenGenre) {
  const button = document.getElementById('genreButton')
  button.textContent = chosenGenre

  const genreColors = {
    Pop: '#f1c5ae',
    Rock: '#ecddd0',
    Rap: '#ced2c2',
    'R&B': '#92b1b6',
    EDM: '#35455d',
    Country: '#bfd1df',
    Jazz: '#e8d0a9',
    Classical: '#c1dad6',
    Indie: '#6d929',
  };

  button.style.backgroundColor = genreColors[chosenGenre] || '#898989';
}
