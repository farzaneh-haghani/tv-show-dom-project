//You can edit ALL of the code here

const rootElem = document.getElementById("root");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  const inputSearch = document.querySelector("#liveSearch");
  inputSearch.addEventListener("keyup", (event) => {
    const newEpisodesArr = [];
    rootElem.innerHTML = "";
    allEpisodes.forEach(eachEpisode => {
      if (eachEpisode.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        eachEpisode.summary.toLowerCase().includes(event.target.value.toLowerCase()))
        newEpisodesArr.push(eachEpisode);
    })
    makePageForEpisodes(newEpisodesArr);
  })
}

function makePageForEpisodes(episodeList) {
  const pCounter = document.querySelector("#counter");
  pCounter.textContent = `Displaying ${episodeList.length} / 73 episode(s)`;
  episodeList.forEach(eachEpisode => {
    showEachEpisode(eachEpisode);
  });
}



function showEachEpisode(episode) {
  const divContainer = document.createElement("div");
  divContainer.classList.add("container");

  const pName = document.createElement("p");
  const seasonNumber = episode.season.toString().padStart(2, "0");
  const episodeNumber = episode.number.toString().padStart(2, "0");
  pName.textContent = `${episode.name} - S${seasonNumber}E${episodeNumber}`;
  pName.classList.add("title");

  const img = document.createElement("img");
  img.src = episode.image.medium;

  rootElem.appendChild(divContainer);
  divContainer.appendChild(pName);
  divContainer.appendChild(img);
  divContainer.innerHTML += episode.summary;
}


window.onload = setup;
