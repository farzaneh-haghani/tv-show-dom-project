//You can edit ALL of the code here

const rootElem = document.getElementById("root");
const inputSearch = document.querySelector("#liveSearch");
const pCounter = document.querySelector("#counter");
const selectMovie = document.querySelector("#selectMovie");


function setup() {
  const allEpisodes = getAllEpisodes();
  makeSelectAndOptions(allEpisodes);      //Level 300
  makePageForEpisodes(allEpisodes);       //Level 200
  makeSearch(allEpisodes);                //Level 100
}


function makeSelectAndOptions(episodeList) {
  episodeList.forEach(eachEpisode => {
    const option = document.createElement("option");
    const seasonNumber = eachEpisode.season.toString().padStart(2, "0");
    const episodeNumber = eachEpisode.number.toString().padStart(2, "0");
    option.innerText = `S${seasonNumber}E${episodeNumber} - ${eachEpisode.name}`
    selectMovie.appendChild(option);
  })
  selectMovie.addEventListener("change", (event) => {
    rootElem.innerHTML = "";
    if (event.target.value === "all")
      makePageForEpisodes(episodeList);
    else {
      const newEpisodesList = episodeList.filter(eachEpisode =>
        eachEpisode.name.includes(event.target.value.split(" - ")[1]));
      makePageForEpisodes(newEpisodesList);
    }
  })
}


function makePageForEpisodes(episodeList) {
  pCounter.textContent = `Displaying ${episodeList.length} / 73 episode(s)`;
  episodeList.forEach(eachEpisode => {
    const divContainer = document.createElement("div");
    divContainer.classList.add("container");
    const pName = document.createElement("p");
    const seasonNumber = eachEpisode.season.toString().padStart(2, "0");
    const episodeNumber = eachEpisode.number.toString().padStart(2, "0");
    pName.textContent = `${eachEpisode.name} - S${seasonNumber}E${episodeNumber}`;
    pName.classList.add("title");
    const img = document.createElement("img");
    img.src = eachEpisode.image.medium;
    rootElem.appendChild(divContainer);
    divContainer.appendChild(pName);
    divContainer.appendChild(img);
    divContainer.innerHTML += eachEpisode.summary;
  });
}


function makeSearch(episodeList) {
  inputSearch.addEventListener("keyup", (event) => {
    rootElem.innerHTML = "";
    const newEpisodesList = episodeList.filter(eachEpisode =>
      eachEpisode.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      eachEpisode.summary.toLowerCase().includes(event.target.value.toLowerCase()))
    makePageForEpisodes(newEpisodesList);
  })
}

window.onload = setup;
