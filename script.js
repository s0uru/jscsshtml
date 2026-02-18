const searchBtn = document.getElementById("search-btn")
const searchText = document.getElementById("search-text")
const gallery = document.getElementById("gallery")


async function getCharacter(name){
    try{
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
        const data = await response.json()
        return data.results;
    }
    catch(error){
        console.error('Wystapil blad:' , error)
        return [];
    }
}
async function showCharacters(characters){
    let output = ``;
    characters.forEach(character => {
        output += `<div class="card">
                        <img src="${character.image}" alt="${character.name}">
                        <div class="card-info">
                            <h3>${character.name}</h3>
                            <p>Status: ${character.status} - ${character.species}</p>
                        </div>
                        </div>`;
    })
    gallery.innerHTML = output;
}

searchBtn.addEventListener("click", async () => {
    const text = searchText.value;
    const characters = await getCharacter(text);

    if(characters && characters.length > 0)
    {
        showCharacters(characters)
    }
    else{
        gallery.innerHTML = `We dont know anyhing about ${text}...`
    }

})

searchText.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});