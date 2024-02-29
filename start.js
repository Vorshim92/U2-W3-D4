async function getAlbum(query) {
  try {
    const params = new URLSearchParams(new URL(query).search);

    const queryValue = params.get("query");

    console.log(queryValue);
    const response = await fetch(query, {
      headers: {
        Authorization: `xYTqi8AxTgbivfEK8KF0COvpDdhs9oL5XVYYKZy1kIKC4ZZt9Mod9T7Z`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
    const albums = await response.json();
    return albums;
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

const primaryBtn = document.getElementById("primaryBtn");
const secondaryBtn = document.getElementById("secondaryBtn");
const searchForm = document.getElementById("searchType");

async function handleQuery(url) {
  try {
    const albums = await getAlbum(url);
    console.log(albums);
    const container = document.querySelector("#rowId");
    container.innerHTML = "";
    albums.photos.forEach((photo) => {
      const cardHtml = `<div class="card mb-4 shadow-sm">
      <img src="${photo.src.original}" class="bd-placeholder-img card-img-top">
      <div class="card-body">
        <h5 class="card-title">${photo.alt}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
            <button type="button" class="btn btn-sm btn-outline-secondary hide">Hide</button>
          </div>
          <small class="text-muted">ID: ${photo.id}</small>
        </div>
      </div>
    </div>`;
      const cardElement = document.createElement("div");
      cardElement.classList.add("col-md-4");
      cardElement.innerHTML = cardHtml;
      container.appendChild(cardElement);

      const hideBtn = cardElement.querySelector(".hide");
      hideBtn.addEventListener("click", function () {
        cardElement.parentNode.removeChild(cardElement);
      });
    });
  } catch (error) {
    console.error("Errore durante il recupero degli album:", error);
  }
}

//todo: creare funzione che prende il valore da un pulsante lista e lo passa come parametro alla query dell'url del secondo pulsante
// facendoti scegliere così la tipologia del secondary button

function fetchParams(params) {}
window.onload = () => {
  primaryBtn.addEventListener("click", () => handleQuery("https://api.pexels.com/v1/search?query=nature&per_page=10"));
  secondaryBtn.addEventListener("click", () => handleQuery("https://api.pexels.com/v1/search?query=science&per_page=10"));
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formValue = searchForm.querySelector('input[type="text"]').value;
    handleQuery(`https://api.pexels.com/v1/search?query=${formValue}&per_page=10`);
  });
};
