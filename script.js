const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  document.getElementById('artists').textContent = '';
  document.getElementById('albums').textContent = '';

  const keywordField = elementById("keyword");
  const keyword = keywordField.value;
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));

  keywordField.value = '';

};

const showArtists = (data) => {
  console.log(data)
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : 'No Data'}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : 'No Data'}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  document.getElementById('albums').textContent = '';
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
};

const showAlbum = (data) => {
  console.log(data)
  const albumContainer = elementById("albums");
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : 'https://i.pinimg.com/736x/82/e7/0c/82e70ceaadafb0705f779206cfb2be82--sky-images-moth.jpg'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
