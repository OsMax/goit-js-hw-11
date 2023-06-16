import API from './js/get-api.js';
import itemTemplate from './js/itemTemplate.js';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

Notiflix.Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'right-bottom',
  opacity: 0.95,
});

const findInput = document.querySelector('.find-input');
const findForm = document.querySelector('.search-form');
const resultField = document.querySelector('.gallery');
const showMore = document.querySelector('#show-more');

let page = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});

findForm.addEventListener('submit', findElem);
showMore.addEventListener('click', addNewElements);

function findElem(e) {
  page = 1;
  e.preventDefault();
  resultField.innerHTML = '';
  getElements(page);
}

function getElements(pageIndex) {
  showMore.classList.add('none');

  API.getApi(findInput.value, pageIndex)
    .then(findImages => {
      console.log(findImages.data);
      fillResultField(findImages.data.hits);
      if (findImages.data.hits.length === 40) {
        showMore.classList.remove('none');
      } else {
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      if (page === 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${findImages.data.total} images.`
        );
      }
    })
    .catch(e => {
      Notiflix.Notify.failure(`${e}`);
    });
}
function addNewElements() {
  page++;
  getElements(page);
}

function fillResultField(findImages) {
  resultField.innerHTML += createElements(findImages);
  lightbox.refresh();
}

function createElements(findImages) {
  return findImages
    .map(e => {
      return itemTemplate.createItem(e);
    })
    .join('');
}
