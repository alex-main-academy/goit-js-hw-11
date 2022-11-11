export const createGalleryCardMarkup = data => {
  return `<div class="photo-card">
  <a href="${data.largeImageURL}">
    <img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <span>Likes</span>
      <b>${data.likes}</b>
    </p>
    <p class="info-item">
      <span>Views</span>
      <b>${data.views}</b>
    </p>
    <p class="info-item">
      <span>Comments</span>
      <b>${data.comments}</b>
    </p>
    <p class="info-item">
      <span>Downloads</span>
      <b>${data.downloads}</b>
    </p>
  </div>
</div>
`;
};
