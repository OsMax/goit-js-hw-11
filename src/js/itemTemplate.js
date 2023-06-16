function createItem(e) {
  return `<li class="gallery__item">
                <a class="gallery__link" href="${e.largeImageURL}" onclick="return false">
                  <img
                    class="gallery__image"
                    src="${e.webformatURL}"
                    alt="${e.tags}"
                  />
                  <ul class="info">
                    <li class="info-item">
                      <b>Likes:</b>
                      <p>${e.likes}</p>
                    </li>
                    <li class="info-item">
                      <b>Views: </b>
                      <p>${e.views}</p>
                    </li>
                    <li class="info-item">
                      <b>Comments: </b>
                      <p>${e.comments}</p>
                    </li>
                    <li class="info-item">
                      <b>Downloads: </b>
                      <p>${e.downloads}</p>
                    </li>
                  </ul>
                </a>
              </li>`;
}

export default { createItem };
