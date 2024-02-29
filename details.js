const localStoragePhoto = "photo";
const photo = JSON.parse(localStorage.getItem(localStoragePhoto));
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
  generateDetailCard(photo);
};
