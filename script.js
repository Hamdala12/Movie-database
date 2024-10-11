const apiKey = '6bee5f0fce3ba85f3eae8dbbcd6b9f84'; 

document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    searchMovies(query);
});

function searchMovies(query) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

    fetch(searchUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error searching for movies: ', error);
            alert('Error searching for movies: ' + error.message);
        });
}

function displayMovies(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; 

    if (movies.length === 0) {
        movieList.innerHTML = '<p>No movies found.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date || 'N/A'}</p>
            <p>${movie.overview || 'No overview available.'}</p>
            <button class="favorite-button" onclick="addToFavorites('${movie.id}', '${movie.title}', '${movie.poster_path}')">Add to Favorites</button>
        `;

        movieList.appendChild(movieCard);
    });
}

let favorites = [];

function addToFavorites(id, title, posterPath) {
    if (!favorites.some(movie => movie.id === id)) {
        favorites.push({ id, title, posterPath });
        displayFavorites();
    } else {
        alert('Movie already in favorites!');
    }
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p>No favorites added.</p>';
        return;
    }

    favorites.forEach(movie => {
        const favoriteCard = document.createElement('div');
        favoriteCard.className = 'movie-card';
        favoriteCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w200${movie.posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <button class="remove-button" onclick="removeFromFavorites('${movie.id}')">Remove from Favorites</button>
        `;

        favoritesList.appendChild(favoriteCard);
    });
}

function removeFromFavorites(id) {
    favorites = favorites.filter(movie => movie.id !== id);
    displayFavorites();
}






