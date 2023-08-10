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

// ===========================================================================================
// ----------------------------------------OBSERVER-------------------------------------------
// ===========================================================================================

const options = {
  rootMargin: '50px',
  threshold: 0.5,
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (findInput.value.trim() !== '') {
        addNewElements();
      }
    }
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(showMore);

let page = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});
// ===========================================================================================

findForm.addEventListener('submit', findElem);
// showMore.addEventListener('click', addNewElements);

function findElem(e) {
  e.preventDefault();
  page = 1;
  resultField.innerHTML = '';
  getElements(page);
}

function getElements(pageIndex) {
  showMore.classList.add('none');
  if (findInput.value.trim() === '') {
    Notiflix.Notify.warning('Warning!!! The input is empty!');
    return;
  }
  API.getApi(findInput.value, pageIndex)
    .then(findImages => {
      fillResultField(findImages.data.hits);
      if (page === 1) {
        Notiflix.Notify.success(
          `Hooray! We found ${findImages.data.total} images.`
        );
      }
      if (page < Math.ceil(findImages.data.totalHits / 40)) {
        showMore.classList.remove('none');
      }
      if (findImages.data.hits.length < 40 && page !== 1) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(e => {
      Notiflix.Notify.failure(`${e}`);
    });
}
function addNewElements() {
  page++;
  console.log(page);
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
