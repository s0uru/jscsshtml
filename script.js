const textInput = document.getElementById('movie-input');
const searchBtn = document.getElementById('search-btn')
const moviesGrid = document.getElementById('movies-grid');

const apiKey = '812a4303'


searchBtn.addEventListener("click", () => {
    const input = textInput.value;

    if(input.length > 0){
        getData(input)
    }

})

async function getData(text){
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${text}`;
    try{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data.Search)

        if(data.Response === "True"){
            displayMovies(data.Search)
        }
        else{
            moviesGrid.innerHTML = `<h2 style="text-align: center; width: 100%;">Nie znaleziono filmów 😔</h2>`;
        }
        
    }
    catch(error){
        console.error(`we have some trubles..` , error)
        return []
    }
}
function displayMovies(movies){
    moviesGrid.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement('div')
        card.classList.add('movie-card')

        const plakat = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Brak+Okładki';

        card.innerHTML = `<img src="${plakat}" alt="${movie.Title}">
                            <h3>${movie.Title}</h3>
                            <p>${movie.Year}</p>`
        
        card.addEventListener("click", () => {
            console.log("Kliknieto film o id:", movie.imdbID)
            showMovieDetails(movie.imdbID)
        })
        moviesGrid.appendChild(card)
    })
}

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

async function showMovieDetails(id){
    modal.classList.remove('hidden');
    modalBody.innerHTML= `<p>Pobieranie danych...</p>`
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        const bigPoster = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=Brak+foto';
        modalBody.innerHTML = `<div style="display: flex; gap: 20px;">
                <img src="${bigPoster}" style="width: 150px;">
                <div>
                    <h2>${data.Title}</h2>
                    <p>⭐ <strong>Ocena:</strong> ${data.imdbRating}</p>
                    <p>🎭 <strong>Gatunek:</strong> ${data.Genre}</p>
                    <p>📅 <strong>Rok:</strong> ${data.Year}</p>
                    <p>⏰ <strong>Czas trwania:</strong> ${data.Runtime}</p>
                </div>
            </div>
            <p style="margin-top: 20px;"><em>${data.Plot}</em></p><br>
            <p><strong>Aktorzy:</strong> ${data.Actors}</p>`;
    }
    catch(error){
        modalBody.innerHTML = `<p>Nie udalo sie pobrac szczegółów :(</p>`
    }
}


closeModal.addEventListener("click", () =>{
    modal.classList.add('hidden');
})

window.addEventListener("click" ,(e)=>{
    if(e.target ===modal){
        modal.classList.add('hidden');
    }
})

textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});



//{"Title":"Guardians of the Galaxy Vol. 2",
// "Year":"2017",
// "Rated":"PG-13",
// "Released":"05 May 2017",
// "Runtime":"136 min",
// "Genre":"Action, Adventure, Comedy",
// "Director":"James Gunn",
// "Writer":"James Gunn, Dan Abnett, Andy Lanning",
// "Actors":"Chris Pratt, Zoe Saldaña, Dave Bautista",
// "Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father,
//  the ambitious celestial being Ego.",
// "Language":"English",
// "Country":"United States",
// "Awards":"Nominated for 1 Oscar. 15 wins & 60 nominations total",
// "Poster":"https://m.media-amazon.com/images/M/MV5BNWE5MGI3MDctMmU5Ni00YzI2LWEzMTQtZGIyZDA5MzQzNDBhXkEyXkFqcGc@._V1_SX300.jpg",
// "Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],
// "Metascore":"67",
// "imdbRating":"7.6",
// "imdbVotes":"819,917",
// "imdbID":"tt3896198",
// "Type":"movie",
// "DVD":"N/A",
// "BoxOffice":"$389,813,101",
// "Production":"N/A",
// "Website":"N/A","Response":"True"}