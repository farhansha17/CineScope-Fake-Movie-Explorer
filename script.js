const API_URL = 'https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json';
const moviesContainer = document.getElementById('movies-container');
const searchInput = document.getElementById('search');
let allMovies = [];

fetchMovies();

async function fetchMovies() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allMovies = data;
    displayMovies(data.slice(0, 20)); // show default 20 movies
  } catch (err) {
    moviesContainer.innerHTML = `<p style="color:red;">Failed to load movies. Try again later.</p>`;
    console.error(err);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    const posterURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(movie.title)}&background=random&size=300`;

    movieEl.innerHTML = `
      <img src="${posterURL}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.year}</p>
    `;

    moviesContainer.appendChild(movieEl);
  });
}

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query.length > 2) {
    const filtered = allMovies.filter(movie =>
      movie.title.toLowerCase().includes(query)
    );
    displayMovies(filtered.slice(0, 20)); // show only top 20 matches
  } else {
    displayMovies(allMovies.slice(0, 20)); // fallback to default
  }
});
