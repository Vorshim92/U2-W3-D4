// VARIABILI GLOBALI
const primaryBtn = document.getElementById("primaryBtn");
const secondaryBtn = document.getElementById("secondaryBtn");
const searchForm = document.getElementById("searchType");
const localStorageAlbum = "album";
const localStoragePhoto = "photo";
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
    const album = await response.json();
    localStorage.setItem(localStorageAlbum, JSON.stringify(album));
    return album;
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

// funzione di callback per gli addeventlistener vari
async function handleQuery(url) {
  try {
    const album = await getAlbum(url);
    console.log(album);

    createAlbum(album);
  } catch (error) {
    console.error("Errore durante il recupero degli album:", error);
  }
}
function createAlbum(album) {
  const container = document.querySelector("#rowId");
  container.innerHTML = "";
  album.photos.forEach((photo) => {
    const cardHtml = `<div class="card mb-4 shadow-sm">
        <img src="${photo.src.portrait}" class="bd-placeholder-img card-img-top">
        <div class="card-body">
          <h5 class="card-title">${photo.alt}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary" id="view">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary" id="hide">Hide</button>
            </div>
            <small class="text-muted">ID: ${photo.id}</small>
          </div>
        </div>
      </div>`;
    const cardElement = document.createElement("div");
    cardElement.classList.add("col-md-4");
    cardElement.innerHTML = cardHtml;
    container.appendChild(cardElement);

    const hideBtn = cardElement.querySelector("#hide");
    hideBtn.addEventListener("click", function (e) {
      cardElement.parentNode.removeChild(cardElement);
    });
    const viewBtn = cardElement.querySelector("#view");
    viewBtn.addEventListener("click", function (e) {
      const modal = document.getElementById("myModal");
      const modalImg = document.getElementById("modalImg");
      const closeModalBtn = document.querySelector(".close");
      modal.style.display = "block";
      modalImg.src = photo.src.portrait;
      closeModalBtn.addEventListener("click", function (e) {
        modal.style.display = "none";
        modalImg.src = "";
      });
    });
    const imgCard = cardElement.querySelector("img");
    const titleCard = cardElement.querySelector("h5");
    imgCard.addEventListener("click", function (e) {});
    titleCard.addEventListener("click", function (e) {});
  });
}

window.onload = () => {
  primaryBtn.addEventListener("click", () => handleQuery("https://api.pexels.com/v1/search?query=nature&per_page=10"));
  secondaryBtn.addEventListener("click", () => handleQuery("https://api.pexels.com/v1/search?query=science&per_page=10"));
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formValue = searchForm.querySelector('input[type="text"]').value;
    handleQuery(`https://api.pexels.com/v1/search?query=${formValue}&per_page=10`);
  });
  if (localStorage.getItem(localStorageAlbum)) {
    createAlbum(JSON.parse(localStorage.getItem(localStorageAlbum)));
  }
};
