//You can edit ALL of the code here

const rootElem = document.getElementById("root");
const inputSearch = document.querySelector("#liveSearch");
const pCounter = document.querySelector("#counter");
const selectEpisodes = document.querySelector("#selectEpisodes");
const selectShow = document.querySelector("#selectShows");


function setup() {
  const allShows = getAllShows();
  makeSelectShows(allShows);               //level 400
  fetchingShows()
}


function makeSelectShows(shows) {
  shows.forEach(eachShow => {
    const option = document.createElement("option");
    option.textContent = eachShow.name;
    option.value = eachShow.id;
    selectShow.appendChild(option);
  })
}


function fetchingShows() {
  selectShow.addEventListener("change", () => {
    if (selectShow.value === "empty")
      selectEpisodes.innerHTML = `<option value="all">All Episodes</option>`;
    else {
      fetch(`https://api.tvmaze.com/shows/${selectShow.value}/episodes`)     //Level 350
        .then(response => response.json())
        .then(episodes => {
          makeSelectEpisodes(episodes, episodes);                            //Level 300
          makePageForEpisodes(episodes, episodes);                           //Level 100  
          makeSearch(episodes);                                              //Level 200      
        })
        .catch(err => console.error(err));
    }
  })
}


function makeSelectEpisodes(episodeList) {
  selectEpisodes.innerHTML = `<option value="all">All Episodes</option>`
  episodeList.forEach(eachEpisode => {
    const option = document.createElement("option");
    const seasonNumber = eachEpisode.season.toString().padStart(2, "0");
    const episodeNumber = eachEpisode.number.toString().padStart(2, "0");
    option.innerText = `S${seasonNumber}E${episodeNumber} - ${eachEpisode.name}`;
    selectEpisodes.appendChild(option);
  });
  selectEpisodes.addEventListener("change", (event) => {
    rootElem.innerHTML = "";
    if (event.target.value === "all")
      makePageForEpisodes(episodeList, episodeList);
    else {
      const newEpisodesList = episodeList.filter(eachEpisode =>
        eachEpisode.name.includes(event.target.value.split(" - ")[1]));
      makePageForEpisodes(newEpisodesList, episodeList);
    }
  })
}


function makePageForEpisodes(episodeList, allEpisode) {
  pCounter.textContent = `Displaying ${episodeList.length} / ${allEpisode.length} episode(s)`;
  rootElem.innerHTML = "";
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
      eachEpisode.name.toLowerCase().includes(event.target.value.toLowerCase())
      || eachEpisode.summary.toLowerCase().includes(event.target.value.toLowerCase()))
    makePageForEpisodes(newEpisodesList, episodeList);
  })
}


window.onload = setup;
