const localStoragePhoto = "photoID";
const photoID = JSON.parse(localStorage.getItem(localStoragePhoto));

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
    generateDetailCard(photo);
  } catch (error) {
    console.error("Errore durante il recupero dei libri:", error);
  }
}

function generateDetailCard(photo) {
  const containerCard = document.getElementById("photoCard");
  containerCard.innerHTML = `<div class="card mb-4 shadow-sm">
    <img src="${photo.src.small}" class="bd-placeholder-img card-img-top cursor-pointer">
    <div class="card-body">
      <h5 class="card-title cursor-pointer">${photo.alt}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary" id="back">BACK TO MAIN</button>
        </div>
        <small class="text-muted">ID: ${photo.id}</small>
      </div>
    </div>
  </div>`;
}
window.onload = () => {
  getPhoto(photoID);
};
