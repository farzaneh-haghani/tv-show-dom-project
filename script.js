//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const pCounter = document.querySelector("#counter");
  pCounter.textContent = `Got ${episodeList.length} episode(s)`;

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

window.onload = setup;
