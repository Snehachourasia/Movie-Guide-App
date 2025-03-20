const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

// Function to fetch movie details using API
const getMovieInfo = async (movie) => {
    const apiKey = "54bf5fd4";  // Correct API Key
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;  // Correct API request URL


    try {
        const response = await fetch(url);
        const data = await response.json();

        showMovieData(data);

        if (data.Response === "False") {
            console.error("Error:", data.Error);
        } else {
            console.log(data);
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        showErrorMessage("No Movie Found!!");
    }
};

// Function to show data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('no-background');    
    // Use destructuring assignment to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim();
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                               <p><strong>Duration:</strong> ${Runtime}</p>
                               <p><strong>Cast:</strong> ${Actors}</p>
                               <p><strong>Plot:</strong> ${Plot}</p>`;

    // Create div for poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="Movie Poster"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

//function to display error message
const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('no-background');

}
//function to handle form submission
const handleFormSubmission=(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Infomation...")
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information");
       
    }

}
//Adding event lostener to search form
searchForm.addEventListener('submit', handleFormSubmission )