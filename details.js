// const localStoragePhoto = "photoID";
// const photoID = JSON.parse(localStorage.getItem(localStoragePhoto));

const photoID = new URLSearchParams(window.location.search).get("id");

async function getPhoto(id) {
  try {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: `xYTqi8AxTgbivfEK8KF0COvpDdhs9oL5XVYYKZy1kIKC4ZZt9Mod9T7Z`,
      },
    });
    if (!response.ok) {
      throw new Error("Errore nella richiesta API");
    }
    const photo = await response.json();
    console.log(photo);
    generateDetailCard(photo);
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

function generateDetailCard(photo) {
  const containerCard = document.getElementById("photoCard");
  containerCard.innerHTML = `<div class="card mb-4 shadow-sm" style="width: 500px; margin-inline: auto">
    <img src="${photo.src.portrait}" class="bd-placeholder-img card-img-top">
    <div class="card-body">
      <h5 class="card-title">${photo.alt}</h5>
      <h5 class="card-text">${photo.photographer}</h5>
      <a href="${photo.photographer_url}" class="card-text">${photo.photographer_url}</a>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" id="back">BACK TO MAIN</button>
        </div>
        <small class="text-muted">ID: ${photo.id}</small>
      </div>
    </div>
  </div>`;
  const backBtn = containerCard.querySelector("#back");
  backBtn.addEventListener("click", function (e) {
    localStorage.setItem("backBtn", true);
    window.location.href = "./index.html";
  });
}
window.onload = () => {
  getPhoto(photoID);
};
